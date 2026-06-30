<?php

namespace Tests\Feature;

use App\Models\SiteContent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicSiteContentTest extends TestCase
{
    use RefreshDatabase;

    public function test_frontend_payload_contains_the_seeded_header_banner(): void
    {
        $response = $this->getJson('/api/site-content/frontend');

        $response
            ->assertOk()
            ->assertJsonPath('header.banner.key', 'header.banner')
            ->assertJsonPath('header.banner.data.heading', 'SCIENCE COMPETITION EXPO')
            ->assertJsonCount(2, 'header.banner.data.left_logos')
            ->assertJsonCount(2, 'header.banner.data.right_logos');
    }

    public function test_hasil_lomba_is_removed_from_the_database_and_frontend_payload(): void
    {
        $this->assertDatabaseMissing('site_contents', [
            'key' => 'page.hasil-lomba',
        ]);

        $pages = $this->getJson('/api/site-content/frontend')
            ->assertOk()
            ->json('pages');

        $this->assertArrayNotHasKey('hasil-lomba', $pages);
    }

    public function test_rich_text_color_markup_is_preserved_by_the_public_api(): void
    {
        $content = '<p><span class="color" data-color="#dc2626" style="--color: #dc2626; --dark-color: #dc2626">Teks merah</span></p>';

        SiteContent::query()->create([
            'key' => 'page.color-test',
            'content_type' => 'page',
            'navigation_group' => 'Informasi',
            'navigation_label' => 'Color Test',
            'title' => 'Color Test',
            'content' => $content,
            'sort_order' => 999,
            'is_active' => true,
        ]);

        $this->getJson('/api/site-content/pages/color-test')
            ->assertOk()
            ->assertJsonPath('content', $content);
    }
}
