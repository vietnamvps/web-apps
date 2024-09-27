import React from 'react';
import { observer, inject } from "mobx-react";
import { Page, Navbar, List, ListItem } from "framework7-react";
import { useTranslation } from "react-i18next";
import SvgIcon from '../../../../../common/mobile/lib/component/SvgIcon';
import IconProtectDocument from '@icons/icon-protect-doc.svg';
import IconEncryptFile from '@icons/icon-encrypt-file.svg';

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
                    <SvgIcon symbolId={IconProtectDocument.id} className='icon icon-svg' />
                </ListItem>
                <ListItem title={t('Settings.textEncryptFile')} link="/encrypt">
                    <SvgIcon symbolId={IconEncryptFile.id} className='icon icon-svg' />
                </ListItem>
            </List>
        </Page>
    )
}));

export default ProtectionView;