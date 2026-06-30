<?php

namespace App\Filament\RichContentPlugins\Tools;

use Filament\Forms\Components\RichEditor\RichEditorTool;

class InlineTextColorTool extends RichEditorTool
{
    public function toEmbeddedHtml(): string
    {
        return <<<'HTML'
            <div
                x-data="{ textColor: '#132638' }"
                x-effect="
                    editorUpdatedAt;
                    const selectedColor = $getEditor()?.getAttributes('textColor')?.['data-color'];
                    if (/^#[0-9a-fA-F]{6}$/.test(selectedColor ?? '')) textColor = selectedColor;
                "
                style="display:inline-flex;align-items:center;gap:0.2rem;padding:0 0.2rem"
            >
                <label
                    title="Pilih warna teks"
                    aria-label="Pilih warna teks"
                    style="display:grid;width:1.85rem;height:1.85rem;cursor:pointer;place-items:center;border-radius:0.45rem"
                >
                    <input
                        type="color"
                        x-model="textColor"
                        x-on:input="$getEditor()?.chain().focus().setTextColor({ color: $event.target.value }).run()"
                        aria-label="Warna teks"
                        style="width:1.45rem;height:1.45rem;cursor:pointer;border:0;border-radius:0.35rem;background:transparent;padding:0"
                    >
                </label>

                <button
                    type="button"
                    title="Hapus warna teks"
                    aria-label="Hapus warna teks"
                    x-on:click="$getEditor()?.chain().focus().unsetTextColor().run()"
                    style="display:grid;width:1.65rem;height:1.65rem;cursor:pointer;place-items:center;border:0;border-radius:0.4rem;background:transparent;color:currentColor;padding:0"
                >
                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" style="width:1rem;height:1rem">
                        <path d="M4 16 16 4M6.5 5.5h7l1.5 1.5v6l-1.5 1.5h-7L4 12V8l2.5-2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            HTML;
    }
}
