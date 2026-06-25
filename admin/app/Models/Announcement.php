<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Announcement extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'excerpt',
        'image_path',
        'content',
        'whatsapp_url',
        'facebook_url',
        'published_at',
        'viewers',
        'sort_order',
        'is_published',
    ];

    protected $appends = [
        'image_url',
        'publisher_name',
        'rendered_content',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'published_at' => 'datetime',
            'sort_order' => 'integer',
            'viewers' => 'integer',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (Announcement $announcement): void {
            if (blank($announcement->slug)) {
                $announcement->slug = static::uniqueSlug($announcement->title, $announcement->getKey());
            } else {
                $announcement->slug = static::uniqueSlug($announcement->slug, $announcement->getKey());
            }

            if (blank($announcement->user_id) && auth()->check()) {
                $announcement->user_id = auth()->id();
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    public function getImageUrlAttribute(): ?string
    {
        return SiteContent::resolveAssetUrl($this->image_path);
    }

    public function getPublisherNameAttribute(): string
    {
        return $this->user?->name ?: 'Administrator Website';
    }

    public function getRenderedContentAttribute(): string
    {
        return SiteContent::rewriteAssetUrls($this->content);
    }

    public static function uniqueSlug(string $value, int|string|null $ignoreId = null): string
    {
        $baseSlug = Str::slug($value) ?: 'pengumuman';
        $slug = $baseSlug;
        $counter = 2;

        while (static::query()
            ->when($ignoreId, fn (Builder $query): Builder => $query->whereKeyNot($ignoreId))
            ->where('slug', $slug)
            ->exists()) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}
