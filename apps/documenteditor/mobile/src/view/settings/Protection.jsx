import React from 'react';
import { observer, inject } from "mobx-react";
import { Page, Navbar, List, ListItem, Icon } from "framework7-react";
import { useTranslation } from "react-i18next";
import SvgIcon from '../../../../../common/mobile/lib/component/SvgIcon';

const ProtectionView = inject("storeAppOptions")(observer(props => {
    const { t } = useTranslation();
    const _t = t("Settings", { returnObjects: true });
    const appOptions = props.storeAppOptions;
    const isProtected = appOptions.isProtected;

    return (
        <Page>
            <Navbar title={t('Settings.textProtection')} backLink={_t.textBack} />
            <List>
                <ListItem title={isProtected ? t('Settings.textUnprotect') : t('Settings.textProtectDocument')} onClick={() => props.onProtectClick()} link="#">
                    <Icon slot="media">
                        <SvgIcon iconId='icon-protect-document' />
                    </Icon>
                </ListItem>
                <ListItem title={t('Settings.textEncryptFile')} link="/encrypt">
                    <Icon slot="media" icon="icon-encrypt-file" />
                </ListItem>
            </List>
        </Page>
    )
}));

export default ProtectionView;