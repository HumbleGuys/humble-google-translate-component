<?php

namespace HumbleGoogleTranslateComponent;

use Illuminate\Support\ServiceProvider as SupportServiceProvider;

class ServiceProvider extends SupportServiceProvider
{
    public function register(): void
    {
        $this->loadViewsFrom(__DIR__.'/resources', 'googleTranslate');
    }

    public function boot(): void
    {
    }
}
