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
     * Set the hues that may be selected by the color picker.
     *
     * @param  array  $hues
     * @return $this
     */
    public function type(string $type)
    {
        return $this->withMeta(['type' => $type]);
    }

    /**
     * Set the hues that may be selected by the color picker.
     *
     * @param  array  $hues
     * @return $this
     */
    public function previewUrl(string $url)
    {
        return $this->withMeta(['previewUrl' => $url]);
    }
}
