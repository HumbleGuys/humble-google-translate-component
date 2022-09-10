<x-layout>
    <div style="padding:10rem; width: 100rem; margin:auto; max-width:100%;">
        <x-googleTranslate::base
            default="sv"
            :languages="['sv', 'en']"
        >
            <x-googleTranslate::button language="sv">
                Svenska
            </x-googleTranslate::button>

            <x-googleTranslate::button language="en">
                Engelska
            </x-googleTranslate::button>

            <x-googleTranslate::button language="de">
                Tyska
            </x-googleTranslate::button>
        </x-googleTranslate::base>
    </div>
</x-layout>