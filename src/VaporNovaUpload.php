<?php

namespace Ellefsen\VaporNovaUpload;

use Laravel\Nova\Fields\Field;

class VaporNovaUpload extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'vapor-nova-upload';

    /**
     * Set the type of image or video to limit what files are allowed on file input.
     *
     * @param  array  $hues
     * @return $this
     */
    public function type(string $type)
    {
        return $this->withMeta(['type' => $type]);
    }

    /**
     * Set the preview url prefix for images and videos.
     *
     * @param  array  $hues
     * @return $this
     */
    public function previewUrl(string $url)
    {
        return $this->withMeta(['previewUrl' => $url]);
    }
}
