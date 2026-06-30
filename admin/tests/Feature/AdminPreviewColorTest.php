<?php

namespace Tests\Feature;

use App\Filament\Pages\Dashboard;
use App\Models\SiteContent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPreviewColorTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_panel_loads_theme_independent_rich_editor_canvas_styles(): void
    {
        $this->get('/admin/login')
            ->assertOk()
            ->assertSee('.announcement-content-editor .fi-fo-rich-editor-content', false)
            ->assertSee('background: #ffffff !important', false)
            ->assertSee('color: var(--color) !important', false);
    }

    public function test_dashboard_partner_notes_preserve_rich_text_color_markup(): void
    {
        $coloredDescription = '<p><span class="color" data-color="#dc2626" style="--color: #dc2626; --dark-color: #dc2626">Catatan berwarna</span></p>';

        SiteContent::query()
            ->where('key', 'home.partner-notes')
            ->firstOrFail()
            ->update([
                'data' => [
                    'notes' => [[
                        'title' => 'Partner Berwarna',
                        'description' => $coloredDescription,
                        'url' => null,
                    ]],
                ],
            ]);

        $notes = app(Dashboard::class)->getPartnerNotes();

        $this->assertSame($coloredDescription, $notes[0]['description']);
    }
}
