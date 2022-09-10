@props([
    'default' => 'sv',
    'languages' => ['sv', 'en']
])

@once
    <div class="custom-translate" style="display: none;" id="google_translate_element"></div>
@endonce

<div 
    x-data="googleTranslate({
        defaultLanguage: '{{ $default }}',
        availableLanguages: {{ json_encode($languages) }},
    })"
    {{ $attributes }}
>
    {!! $slot !!}
</div>

@once
    @push('head')
        <link rel="stylesheet" href="{{ asset('../vendor/humble-guys/humble-google-translate-component/public/resources/dist/style.css?v=0.0.1') }}">
        <script module defer src="{{ asset('../vendor/humble-guys/humble-google-translate-component/public/resources/dist/humble-google-translate-component.umd.js?v=0.0.1') }}"></script>
    @endpush
@endonce 