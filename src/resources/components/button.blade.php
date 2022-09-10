@props([
    'language'
])

<button
    {{ $attributes }}
    :class="{ 'isActive': activeLanguage === '{{ $language }}' }"
    type="button"
    @click="changeLanguage('{{ $language }}')"
>
    {!! $slot !!}
</button>