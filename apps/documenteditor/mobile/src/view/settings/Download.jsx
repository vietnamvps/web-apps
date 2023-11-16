import React from 'react';
import { observer, inject } from "mobx-react";
import { Page, Navbar, List, ListItem, BlockTitle, Icon } from "framework7-react";
import { useTranslation } from "react-i18next";
import SvgIcon from '../../../../../common/mobile/lib/component/SvgIcon';

const Download = props => {
    const { t } = useTranslation();
    const _t = t("Settings", { returnObjects: true });
    const storeDocumentInfo = props.storeDocumentInfo;
    const dataDoc = storeDocumentInfo.dataDoc;
    const canFeatureForms = props.storeAppOptions.canFeatureForms;
    const isAvailableExt = dataDoc.fileType === 'docxf' || dataDoc.fileType === 'docx' || dataDoc.fileType === 'pdf' || dataDoc.fileType === 'pdfa';
    const isForm = dataDoc.fileType === 'oform';

    return (
        <Page>
            <Navbar title={isForm ? t('Settings.textExport') : _t.textDownload} backLink={_t.textBack} />
            <BlockTitle>{isForm ? t('Settings.textExportAs') : _t.textDownloadAs}</BlockTitle>
            <List>
                <ListItem title="DOCX" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.DOCX)}>
                    <Icon slot="media">
                        <SvgIcon iconId="icon-format-docx" />
                    </Icon>
                </ListItem>
                {canFeatureForms && isAvailableExt ? [
                    <ListItem title="DOCXF" key="DOCXF" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.DOCXF)}>
                        <Icon slot="media">
                            <SvgIcon iconId="icon-format-docxf" />
                        </Icon>
                    </ListItem>,
                    <ListItem title="OFORM" key="OFORM" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.OFORM)}>
                        <Icon slot="media">
                            <SvgIcon iconId="icon-format-oform" />
                        </Icon>
                    </ListItem>
                    ] 
                : null}
                <ListItem title="PDF" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.PDF)}>
                    <Icon slot="media">
                        <SvgIcon iconId="icon-format-pdf" />
                    </Icon>
                </ListItem>
                {!isForm ? [
                    <ListItem title="PDF/A" key="PDF/A" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.PDFA)}>
                        <Icon slot="media">
                            <SvgIcon iconId="icon-format-pdfa" />
                        </Icon>
                    </ListItem>,
                    <ListItem title="TXT" key="TXT" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.TXT)}>
                        <Icon slot="media">
                            <SvgIcon iconId="icon-format-txt" />
                        </Icon>
                    </ListItem>,
                    <ListItem title="RTF" key="RTF" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.RTF)}>
                        <Icon slot="media">
                            <SvgIcon iconId="icon-format-rtf" />
                        </Icon>
                    </ListItem>,
                    <ListItem title="ODT" key="ODT" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.ODT)}>
                        <Icon slot="media">
                            <SvgIcon iconId="icon-format-odt" />
                        </Icon>
                    </ListItem>,
                    <ListItem title="HTML" key="HTML" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.HTML)}>
                        <Icon slot="media">
                            <SvgIcon iconId="icon-format-html" />
                        </Icon>
                    </ListItem>,
                    <ListItem title="DOTX" key="DOTX" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.DOTX)}>
                        <Icon slot="media">
                            <SvgIcon iconId="icon-format-dotx" />
                        </Icon>
                    </ListItem>,
                    <ListItem title="OTT" key="OTT" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.OTT)}>
                        <Icon slot="media">
                            <SvgIcon iconId="icon-format-ott" />
                        </Icon>
                    </ListItem>,
                    <ListItem title="FB2" key="FB2" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.FB2)}>
                        <Icon slot="media">
                            <SvgIcon iconId="icon-format-fb2" />
                        </Icon>
                    </ListItem>,
                    <ListItem title="EPUB" key="EPUB" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.EPUB)}>
                        <Icon slot="media">
                            <SvgIcon iconId="icon-format-epub" />
                        </Icon>
                    </ListItem>,
                    ]
                : null}
            </List>
        </Page>
    )
}

export default inject('storeDocumentInfo', 'storeAppOptions')(observer(Download));