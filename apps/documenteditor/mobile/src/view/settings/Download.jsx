import React from 'react';
import { observer, inject } from "mobx-react";
import { Page, Navbar, List, ListItem, BlockTitle, Icon } from "framework7-react";
import { useTranslation } from "react-i18next";
import { ReactComponent as IconFormatDocx } from '@/resources/icons/icon-format-docx.svg';
import { ReactComponent as IconFormatDocxf } from '@/resources/icons/icon-format-docxf.svg';
import { ReactComponent as IconFormatDotx } from '@/resources/icons/icon-format-dotx.svg';
import { ReactComponent as IconFormatHtml } from '@/resources/icons/icon-format-html.svg';
import { ReactComponent as IconFormatOdt } from '@/resources/icons/icon-format-odt.svg';
import { ReactComponent as IconFormatOform } from '@/resources/icons/icon-format-oform.svg';
import { ReactComponent as IconFormatOtt } from '@/resources/icons/icon-format-ott.svg';
import { ReactComponent as IconFormatRtf } from '@/resources/icons/icon-format-rtf.svg';
import { ReactComponent as IconFormatTxt } from '@/resources/icons/icon-format-txt.svg';
import { ReactComponent as IconFormatEpub } from '@/resources/icons/icon-format-epub.svg';
import { ReactComponent as IconFormatFb2 } from '@/resources/icons/icon-format-fb2.svg';
import { ReactComponent as IconFormatPdf } from '@common/resources/icons/icon-format-pdf.svg';
import { ReactComponent as IconFormatPdfa } from '@common/resources/icons/icon-format-pdfa.svg';

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
                        <IconFormatDocx />
                    </Icon>
                </ListItem>
                {canFeatureForms && isAvailableExt ? [
                    <ListItem title="DOCXF" key="DOCXF" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.DOCXF)}>
                        <Icon slot="media">
                            <IconFormatDocxf />
                        </Icon>
                    </ListItem>,
                    <ListItem title="OFORM" key="OFORM" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.OFORM)}>
                        <Icon slot="media">
                            <IconFormatOform />
                        </Icon>
                    </ListItem>
                    ] 
                : null}
                <ListItem title="PDF" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.PDF)}>
                    <Icon slot="media">
                        <IconFormatPdf />
                    </Icon>
                </ListItem>
                {!isForm ? [
                    <ListItem title="PDF/A" key="PDF/A" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.PDFA)}>
                        <Icon slot="media">
                            <IconFormatPdfa />
                        </Icon>
                    </ListItem>,
                    <ListItem title="TXT" key="TXT" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.TXT)}>
                        <Icon slot="media">
                            <IconFormatTxt />
                        </Icon>
                    </ListItem>,
                    <ListItem title="RTF" key="RTF" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.RTF)}>
                        <Icon slot="media">
                            <IconFormatRtf />
                        </Icon>
                    </ListItem>,
                    <ListItem title="ODT" key="ODT" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.ODT)}>
                        <Icon slot="media">
                            <IconFormatOdt />
                        </Icon>
                    </ListItem>,
                    <ListItem title="HTML" key="HTML" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.HTML)}>
                        <Icon slot="media" icon="icon-format-html">
                            <IconFormatHtml />
                        </Icon>
                    </ListItem>,
                    <ListItem title="DOTX" key="DOTX" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.DOTX)}>
                        <Icon slot="media">
                            <IconFormatDotx />
                        </Icon>
                    </ListItem>,
                    <ListItem title="OTT" key="OTT" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.OTT)}>
                        <Icon slot="media">
                            <IconFormatOtt />
                        </Icon>
                    </ListItem>,
                    <ListItem title="FB2" key="FB2" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.FB2)}>
                        <Icon slot="media">
                            <IconFormatFb2 />
                        </Icon>
                    </ListItem>,
                    <ListItem title="EPUB" key="EPUB" onClick={() => props.onSaveFormat(Asc.c_oAscFileType.EPUB)}>
                        <Icon slot="media">
                            <IconFormatEpub />
                        </Icon>
                    </ListItem>,
                    ]
                : null}
            </List>
        </Page>
    )
}

export default inject('storeDocumentInfo', 'storeAppOptions')(observer(Download));