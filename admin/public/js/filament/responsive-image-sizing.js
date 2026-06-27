const { Extension } = window.FilamentRichEditor.tiptap.core
const { Plugin, PluginKey } = window.FilamentRichEditor.tiptap.pmState

const numericWidthPattern = /^(\d+(?:\.\d+)?)(?:px)?$/i

export default Extension.create({
    name: 'responsiveImageSizing',

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('responsiveImageSizing'),

                view(view) {
                    let timeoutId = null
                    let isDestroyed = false

                    const normalizeImageWidths = () => {
                        if (isDestroyed) return

                        const editorWidth = view.dom.clientWidth

                        if (!editorWidth) return

                        const transaction = view.state.tr
                        let hasChanges = false

                        view.state.doc.descendants((node, position) => {
                            if (node.type.name !== 'image') return

                            const width = String(node.attrs.width ?? '').trim()
                            const match = width.match(numericWidthPattern)

                            if (!match) return

                            const percentage = Math.min(
                                100,
                                Math.max(1, (Number(match[1]) / editorWidth) * 100),
                            )
                            const responsiveWidth = `${Number(percentage.toFixed(2))}%`

                            transaction.setNodeMarkup(
                                position,
                                undefined,
                                {
                                    ...node.attrs,
                                    width: responsiveWidth,
                                    height: null,
                                },
                                node.marks,
                            )
                            hasChanges = true
                        })

                        if (hasChanges) {
                            view.dispatch(transaction)
                        }
                    }

                    const scheduleNormalization = () => {
                        window.clearTimeout(timeoutId)
                        timeoutId = window.setTimeout(normalizeImageWidths, 300)
                    }

                    scheduleNormalization()

                    return {
                        update: scheduleNormalization,
                        destroy() {
                            isDestroyed = true
                            window.clearTimeout(timeoutId)
                        },
                    }
                },
            }),
        ]
    },
})
