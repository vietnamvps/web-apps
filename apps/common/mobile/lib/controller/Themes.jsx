import React from 'react';
import { LocalStorage } from "../../utils/LocalStorage.mjs";
import { inject, observer } from "mobx-react";

class ThemesController extends React.Component {
    constructor(props) {
        super(props);
        this.themes_map = {
            dark : {
                id: 'theme-dark',
                type: 'dark'
            },
            light: {
                id: 'theme-light',
                type: 'light'
            },
            system: {
                id: 'theme-system',
                type: 'system'
            }
        }

        this.name_colors = [
            "canvas-background",
            "canvas-content-background",
            "canvas-page-border",

            "canvas-ruler-background",
            "canvas-ruler-border",
            "canvas-ruler-margins-background",
            "canvas-ruler-mark",
            "canvas-ruler-handle-border",
            "canvas-ruler-handle-border-disabled",

            "canvas-high-contrast",
            "canvas-high-contrast-disabled",

            "canvas-cell-border",
            "canvas-cell-title-border",
            "canvas-cell-title-border-hover",
            "canvas-cell-title-border-selected",
            "canvas-cell-title-hover",
            "canvas-cell-title-selected",

            "canvas-dark-cell-title",
            "canvas-dark-cell-title-hover",
            "canvas-dark-cell-title-selected",
            "canvas-dark-cell-title-border",
            "canvas-dark-cell-title-border-hover",
            "canvas-dark-cell-title-border-selected",
            "canvas-dark-content-background",
            "canvas-dark-page-border",

            "canvas-scroll-thumb",
            "canvas-scroll-thumb-hover",
            "canvas-scroll-thumb-pressed",
            "canvas-scroll-thumb-border",
            "canvas-scroll-thumb-border-hover",
            "canvas-scroll-thumb-border-pressed",
            "canvas-scroll-arrow",
            "canvas-scroll-arrow-hover",
            "canvas-scroll-arrow-pressed",
            "canvas-scroll-thumb-target",
            "canvas-scroll-thumb-target-hover",
            "canvas-scroll-thumb-target-pressed",
        ];

        this.setClientTheme = this.setClientTheme.bind(this);
        this.checkConfigTheme = this.checkConfigTheme.bind(this);
        this.checkSystemDarkTheme = this.checkSystemDarkTheme.bind(this);
    }

    turnOffViewerMode() {
        const appOptions = this.props.storeAppOptions;
        appOptions.changeViewerMode(false);
    }

    init() {
        const appOptions = this.props.storeAppOptions;
        const editorConfig = window.native?.editorConfig;
        const editorType = window.editorType;
        const obj = LocalStorage.getItem("ui-theme");
        
        let theme = this.themes_map.light;
        
        if(editorConfig) {
            const isForceEdit = editorConfig.forceedit;
            const themeConfig = editorConfig.theme;
            const typeTheme = themeConfig ? themeConfig.type : null;
            const isSelectTheme = themeConfig ? themeConfig.select : null;

            // if(isForceEdit && editorType === 'de') {
            //     this.turnOffViewerMode();
            // } 

            if(isSelectTheme) {
                if(!!obj) {
                    theme = this.setClientTheme(theme, obj);
                } else {
                    theme = this.checkConfigTheme(theme, typeTheme);
                } 
            } else {
                theme = this.checkConfigTheme(theme, typeTheme);
            }
            
            appOptions.setConfigSelectTheme(isSelectTheme);
        } else {
            if (!!obj) {
                theme = this.setClientTheme(theme, obj);
            } else {
                theme = this.checkSystemDarkTheme(theme);
            }
        }  

        this.changeColorTheme(theme);

        $$(window).on('storage', e => {
            if ( e.key == LocalStorage.prefix + 'ui-theme' ) {
                if ( !!e.newValue ) {
                    this.changeColorTheme(JSON.parse(e.newValue), true);
                }
            }
        });
    }

    setClientTheme(theme, obj) {
        const type = JSON.parse(obj).type;
        const appOptions = this.props.storeAppOptions;

        if(type !== 'system') {
            theme = this.themes_map[JSON.parse(obj).type];

            LocalStorage.setItem("ui-theme", JSON.stringify(theme));
            appOptions.setColorTheme(theme);
        } else {
            theme = this.checkSystemDarkTheme(theme);
        }

        return theme;
    }

    checkConfigTheme(theme, typeTheme) {
        const appOptions = this.props.storeAppOptions;

        if(typeTheme && typeTheme !== 'system') { 
            theme = this.themes_map[typeTheme];

            LocalStorage.setItem("ui-theme", JSON.stringify(theme));
            appOptions.setColorTheme(theme);
        } else {
            theme = this.checkSystemDarkTheme(theme);
        }

        return theme;
    }

    checkSystemDarkTheme(theme) {
        const appOptions = this.props.storeAppOptions;

        if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            theme = this.themes_map['dark'];

            LocalStorage.setItem("ui-theme", JSON.stringify(this.themes_map["system"]));
            appOptions.setColorTheme(this.themes_map["system"]);
        }

        return theme;
    }

    get_current_theme_colors(colors) {
        let out_object = {};
        const style = getComputedStyle(document.body);
        colors.forEach((item, index) => {
            out_object[item] = style.getPropertyValue('--' + item).trim()
        })

        return out_object;
    }

    changeColorTheme(theme) {
        const $body = $$('body');
        $body.attr('class') && $body.attr('class', $body.attr('class').replace(/\s?theme-type-(?:dark|light)/, ''));
        $body.addClass(`theme-type-${theme.type}`);

        const on_engine_created = api => {
            let obj = this.get_current_theme_colors(this.name_colors);
            obj.type = theme.type;
            obj.name = theme.id;

            api.asc_setSkin(obj);
        };

        const api = Common.EditorApi ? Common.EditorApi.get() : undefined;
        if(!api) Common.Notifications.on('engineCreated', on_engine_created);
        else on_engine_created(api);
    }

    componentDidMount() {
        this.init();
    }

    render() {
        return null;
    }
}

const themes = inject('storeAppOptions')(observer(ThemesController));
export {themes as Themes}