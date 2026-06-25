<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicAnnouncementController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $limit = min(max((int) $request->integer('limit', 0), 0), 12);

        $query = Announcement::query()
            ->with('user')
            ->published()
            ->orderByDesc('published_at')
            ->orderByDesc('sort_order')
            ->orderByDesc('id');

        if ($limit > 0) {
            $query->limit($limit);
        }

        return response()->json([
            'items' => $query
                ->get()
                ->map(fn (Announcement $announcement): array => $this->payload($announcement, includeContent: false))
                ->all(),
        ]);
    }

    public function show(Announcement $announcement): JsonResponse
    {
        abort_unless($this->isPubliclyVisible($announcement), 404);

        $announcement->load('user');

        return response()->json($this->payload($announcement) + [
            'related' => Announcement::query()
                ->with('user')
                ->published()
                ->whereKeyNot($announcement->getKey())
                ->orderByDesc('published_at')
                ->orderByDesc('sort_order')
                ->orderByDesc('id')
                ->limit(2)
                ->get()
                ->map(fn (Announcement $related): array => $this->payload($related, includeContent: false))
                ->all(),
        ]);
    }

    public function trackView(Announcement $announcement): JsonResponse
    {
        abort_unless($this->isPubliclyVisible($announcement), 404);

        $announcement->increment('viewers');

        return response()->json([
            'viewers' => $announcement->refresh()->viewers,
        ]);
    }

    protected function payload(Announcement $announcement, bool $includeContent = true): array
    {
        return [
            'id' => $announcement->id,
            'title' => $announcement->title,
            'slug' => $announcement->slug,
            'path' => '/pengumuman/' . $announcement->slug,
            'excerpt' => $announcement->excerpt,
            'image_url' => $announcement->image_url,
            'content' => $includeContent ? $announcement->rendered_content : null,
            'published_at' => $announcement->published_at?->toIso8601String(),
            'publisher_name' => $announcement->publisher_name,
            'viewers' => $announcement->viewers,
            'whatsapp_url' => $announcement->whatsapp_url,
            'facebook_url' => $announcement->facebook_url,
        ];
    }

    protected function isPubliclyVisible(Announcement $announcement): bool
    {
        return $announcement->is_published
            && $announcement->published_at !== null
            && $announcement->published_at->lte(now());
    }
}
