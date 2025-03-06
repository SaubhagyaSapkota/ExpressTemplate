import type translation from '../../locales/en/translation.json';
import type auth from '../../locales/en/auth.json';
import type error from '../../locales/en/error.json';

import 'i18next';

declare module 'i18next' {
    interface CustomTypeOptions {
        resources: {
            translation: typeof translation;
            auth: typeof auth;
            error: typeof error;
        };
    }
}
