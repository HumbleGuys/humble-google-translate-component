<div 
    x-data="googleTranslate"
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