<?php

namespace Tests\Feature;

use App\Filament\RichContentPlugins\InlineTextColorPlugin;
use Tests\TestCase;

class InlineTextColorToolTest extends TestCase
{
    public function test_inline_color_tool_applies_color_without_a_filament_modal(): void
    {
        $tool = InlineTextColorPlugin::make()->getEditorTools()[0];
        $html = $tool->toEmbeddedHtml();

        $this->assertStringContainsString('type="color"', $html);
        $this->assertStringContainsString('setTextColor', $html);
        $this->assertStringContainsString('unsetTextColor', $html);
        $this->assertStringNotContainsString('mountAction', $html);
    }
}
