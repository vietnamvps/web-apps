import React, {Fragment, useState, useEffect} from 'react';
import {observer, inject} from "mobx-react";
import {f7, Page, Navbar, List, ListItem, ListButton, BlockTitle,SkeletonBlock, Range, Toggle, Icon, Link, Tabs, Tab, NavRight} from 'framework7-react';
import { useTranslation } from 'react-i18next';
import {Device} from '../../../../../common/mobile/utils/device';
import {CustomColorPicker, ThemeColorPalette} from "../../../../../common/mobile/lib/component/ThemeColorPalette.jsx";
import SvgIcon from '../../../../../common/mobile/lib/component/SvgIcon';
import IconExpandDownIos from '@common-ios-icons/icon-expand-down.svg';
import IconExpandDownAndroid from '@common-android-icons/icon-expand-down.svg';
import IconTableBordersAllIos from '@common-ios-icons/icon-table-borders-all.svg';
import IconTableBordersAllAndroid from '@common-android-icons/icon-table-borders-all.svg';
import IconTableBordersNoneIos from '@common-ios-icons/icon-table-borders-none.svg';
import IconTableBordersNoneAndroid from '@common-android-icons/icon-table-borders-none.svg';
import IconTableBordersInnerIos from '@common-ios-icons/icon-table-borders-inner.svg';
import IconTableBordersInnerAndroid from '@common-android-icons/icon-table-borders-inner.svg';
import IconTableBordersOuterIos from '@common-ios-icons/icon-table-borders-outer.svg';
import IconTableBordersOuterAndroid from '@common-android-icons/icon-table-borders-outer.svg';
import IconTableBordersLeftIos from '@common-ios-icons/icon-table-borders-left.svg';
import IconTableBordersLeftAndroid from '@common-android-icons/icon-table-borders-left.svg';
import IconTableBordersCenterIos from '@common-ios-icons/icon-table-borders-center.svg';
import IconTableBordersCenterAndroid from '@common-android-icons/icon-table-borders-center.svg';
import IconTableBordersRightIos from '@common-ios-icons/icon-table-borders-right.svg';
import IconTableBordersRightAndroid from '@common-android-icons/icon-table-borders-right.svg';
import IconTableBordersTopIos from '@common-ios-icons/icon-table-borders-top.svg';
import IconTableBordersTopAndroid from '@common-android-icons/icon-table-borders-top.svg';
import IconTableBordersMiddleIos from '@common-ios-icons/icon-table-borders-middle.svg';
import IconTableBordersMiddleAndroid from '@common-android-icons/icon-table-borders-middle.svg';
import IconTableBordersBottomIos from '@common-ios-icons/icon-table-borders-bottom.svg';
import IconTableBordersBottomAndroid from '@common-android-icons/icon-table-borders-bottom.svg';
import IconMoveForegroundIos from '@common-ios-icons/icon-move-foreground.svg';
import IconMoveForegroundAndroid from '@common-android-icons/icon-move-foreground.svg';
import IconMoveBackgroundIos from '@common-ios-icons/icon-move-background.svg';
import IconMoveBackgroundAndroid from '@common-android-icons/icon-move-background.svg';
import IconMoveForwardIos from '@common-ios-icons/icon-move-forward.svg';
import IconMoveForwardAndroid from '@common-android-icons/icon-move-forward.svg';
import IconMoveBackwardIos from '@common-ios-icons/icon-move-backward.svg';
import IconMoveBackwardAndroid from '@common-android-icons/icon-move-backward.svg';
import IconAlignLeftIos from '@ios-icons/icon-align-left.svg';
import IconAlignLeftAndroid from '@android-icons/icon-align-left.svg';
import IconAlignCenterIos from '@ios-icons/icon-align-center.svg';
import IconAlignCenterAndroid from '@android-icons/icon-align-center.svg';
import IconAlignRightIos from '@ios-icons/icon-align-right.svg';
import IconAlignRightAndroid from '@android-icons/icon-align-right.svg';
import IconAlignTopIos from '@ios-icons/icon-align-top.svg';
import IconAlignTopAndroid from '@android-icons/icon-align-top.svg';
import IconAlignMiddleIos from '@ios-icons/icon-align-middle.svg';
import IconAlignMiddleAndroid from '@android-icons/icon-align-middle.svg';
import IconAlignBottomIos from '@ios-icons/icon-align-bottom.svg';
import IconAlignBottomAndroid from '@android-icons/icon-align-bottom.svg';
import IconAlignHorizontalIos from '@ios-icons/icon-align-horizontal.svg';
import IconAlignHorizontalAndroid from '@android-icons/icon-align-horizontal.svg';
import IconAlignVerticalIos from '@ios-icons/icon-align-vertical.svg';
import IconAlignVerticalAndroid from '@android-icons/icon-align-vertical.svg';
import IconTableAddColumnLeftIos from '@common-ios-icons/icon-table-add-column-left.svg';
import IconTableAddColumnLeftAndroid from '@common-android-icons/icon-table-add-column-left.svg';
import IconTableAddColumnRightIos from '@common-ios-icons/icon-table-add-column-right.svg';
import IconTableAddColumnRightAndroid from '@common-android-icons/icon-table-add-column-right.svg';
import IconTableAddRowAboveIos from '@common-ios-icons/icon-table-add-row-above.svg';
import IconTableAddRowAboveAndroid from '@common-android-icons/icon-table-add-row-above.svg';
import IconTableAddRowBelowIos from '@common-ios-icons/icon-table-add-row-below.svg';
import IconTableAddRowBelowAndroid from '@common-android-icons/icon-table-add-row-below.svg';
import IconTableRemoveColumnIos from '@common-ios-icons/icon-table-remove-column.svg';
import IconTableRemoveColumnAndroid from '@common-android-icons/icon-table-remove-column.svg';
import IconTableRemoveRowIos from '@common-ios-icons/icon-table-remove-row.svg';
import IconTableRemoveRowAndroid from '@common-android-icons/icon-table-remove-row.svg';

// Style

const StyleTemplates = inject("storeFocusObjects","storeTableSettings")(observer(({onStyleClick,storeTableSettings,storeFocusObjects,onGetTableStylesPreviews}) => {
    const tableObject = storeFocusObjects.tableObject;
    const styleId = tableObject ? tableObject.get_TableStyle() : null;
    const [stateId, setId] = useState(styleId);
    const styles =  storeTableSettings.arrayStyles;

    useEffect(() => {
        if(!styles.length) onGetTableStylesPreviews();
    }, []);

    if (!tableObject && Device.phone) {
        $$('.sheet-modal.modal-in').length > 0 && f7.sheet.close();
        return null;
    }
            
    return (
        <div className="dataview table-styles">
            <ul className="row">
                {!styles.length ?
                        Array.from({ length: 34 }).map((item,index) => (
                        <li className='skeleton-list' key={index}>    
                            <SkeletonBlock  width='70px' height='8px'  effect='wave'/>
                            <SkeletonBlock  width='70px' height='8px'  effect='wave' />
                            <SkeletonBlock  width='70px' height='8px'  effect='wave' />
                            <SkeletonBlock  width='70px' height='8px'  effect='wave' />
                            <SkeletonBlock  width='70px' height='8px'  effect='wave' />
                        </li> 
                    )) :
                        styles.map((style, index) => {
                            return (
                                <li key={index}
                                    className={style.templateId === stateId ? 'active' : ''}
                                    onClick={() => {onStyleClick(style.templateId); setId(style.templateId)}}>
                                    <img src={style.imageUrl}/>
                                </li>
                            )
                        })
                    }
            </ul>
        </div>
    )
}));

const PageStyleOptions = props => {
    const { t } = useTranslation();
    const _t = t('View.Edit', {returnObjects: true});

    const tableObject = props.storeFocusObjects.tableObject;
    let tableLook, isFirstRow, isLastRow, isBandHor, isFirstCol, isLastCol, isBandVer;

    if (tableObject) {
        tableLook = tableObject.get_TableLook();
        isFirstRow = tableLook.get_FirstRow();
        isLastRow = tableLook.get_LastRow();
        isBandHor = tableLook.get_BandHor();
        isFirstCol = tableLook.get_FirstCol();
        isLastCol = tableLook.get_LastCol();
        isBandVer = tableLook.get_BandVer();
    }

    return (
        <Page>
            <Navbar title={_t.textOptions} backLink={_t.textBack} onBackClick={props.onGetTableStylesPreviews}>
                {Device.phone &&
                    <NavRight>
                        <Link sheetClose='#edit-sheet'>
                            {Device.ios ? 
                                <SvgIcon symbolId={IconExpandDownIos.id} className={'icon icon-svg'} /> :
                                <SvgIcon symbolId={IconExpandDownAndroid.id} className={'icon icon-svg'} />
                            }
                        </Link>
                    </NavRight>
                }
            </Navbar>
            <List>
                <ListItem title={_t.textHeaderRow}>
                    <Toggle checked={isFirstRow} onToggleChange={() => {props.onCheckTemplateChange(tableLook, 0, !isFirstRow)}}/>
                </ListItem>
                <ListItem title={_t.textTotalRow}>
                    <Toggle checked={isLastRow} onToggleChange={() => {props.onCheckTemplateChange(tableLook, 1, !isLastRow)}}/>
                </ListItem>
                <ListItem title={_t.textBandedRow}>
                    <Toggle checked={isBandHor} onToggleChange={() => {props.onCheckTemplateChange(tableLook, 2, !isBandHor)}}/>
                </ListItem>
            </List>
            <List>
                <ListItem title={_t.textFirstColumn}>
                    <Toggle checked={isFirstCol} onToggleChange={() => {props.onCheckTemplateChange(tableLook, 3, !isFirstCol)}}/>
                </ListItem>
                <ListItem title={_t.textLastColumn}>
                    <Toggle checked={isLastCol} onToggleChange={() => {props.onCheckTemplateChange(tableLook, 4, !isLastCol)}}/>
                </ListItem>
                <ListItem title={_t.textBandedColumn}>
                    <Toggle checked={isBandVer} onToggleChange={() => {props.onCheckTemplateChange(tableLook, 5, !isBandVer)}}/>
                </ListItem>
            </List>
        </Page>
    )
};

const PageCustomFillColor = props => {
    const { t } = useTranslation();
    const _t = t('View.Edit', {returnObjects: true});
    const tableObject = props.storeFocusObjects.tableObject;
    let fillColor = tableObject && props.storeTableSettings.getFillColor(tableObject);

    if (typeof fillColor === 'object') {
        fillColor = fillColor.color;
    }

    const onAddNewColor = (colors, color) => {
        props.storePalette.changeCustomColors(colors);
        props.onFillColor(color);
        props.f7router.back();
    };

    return(
        <Page>
            <Navbar title={_t.textCustomColor} backLink={_t.textBack}>
                {Device.phone &&
                    <NavRight>
                        <Link sheetClose='#edit-sheet'>
                            {Device.ios ? 
                                <SvgIcon symbolId={IconExpandDownIos.id} className={'icon icon-svg'} /> :
                                <SvgIcon symbolId={IconExpandDownAndroid.id} className={'icon icon-svg'} />
                            }
                        </Link>
                    </NavRight>
                }
            </Navbar>
            <CustomColorPicker currentColor={fillColor} onAddNewColor={onAddNewColor}/>
        </Page>
    )
};

const TabFillColor = inject("storeFocusObjects", "storeTableSettings", "storePalette")(observer(props => {
    const { t } = useTranslation();
    const _t = t('View.Edit', {returnObjects: true});
    const tableObject = props.storeFocusObjects.tableObject;
    const fillColor = tableObject && props.storeTableSettings.getFillColor(tableObject);
    const customColors = props.storePalette.customColors;

    const changeColor = (color, effectId, effectValue) => {
        if (color !== 'empty') {
            if (effectId !== undefined ) {
                const newColor = {color: color, effectId: effectId, effectValue: effectValue};
                props.onFillColor(newColor);
            } else {
                props.onFillColor(color);
            }
        } else {
            // open custom color menu
            props.f7router.navigate('/edit-table-custom-fill-color/', {props: {onFillColor: props.onFillColor}});
        }
    };

    return (
       <Fragment>
           <ThemeColorPalette changeColor={changeColor} curColor={fillColor} customColors={customColors} transparent={true}/>
           <List>
               <ListItem title={_t.textAddCustomColor} link={'/edit-table-custom-fill-color/'} routeProps={{
                   onFillColor: props.onFillColor
               }}></ListItem>
           </List>
       </Fragment>
    )
}));

const PageCustomBorderColor = props => {
    const { t } = useTranslation();
    const _t = t('View.Edit', {returnObjects: true});
    let borderColor = props.storeTableSettings.cellBorderColor;

    if (typeof borderColor === 'object') {
        borderColor = borderColor.color;
    }

    const onAddNewColor = (colors, color) => {
        props.storePalette.changeCustomColors(colors);
        props.storeTableSettings.updateCellBorderColor(color);
        props.f7router.back();
    };
    const autoColor = props.storeTableSettings.colorAuto === 'auto' ? window.getComputedStyle(document.getElementById('font-color-auto')).backgroundColor : null;
    return (
        <Page>
            <Navbar title={_t.textCustomColor} backLink={_t.textBack}>
                {Device.phone &&
                    <NavRight>
                        <Link sheetClose='#edit-sheet'>
                            {Device.ios ? 
                                <SvgIcon symbolId={IconExpandDownIos.id} className={'icon icon-svg'} /> :
                                <SvgIcon symbolId={IconExpandDownAndroid.id} className={'icon icon-svg'} />
                            }
                        </Link>
                    </NavRight>
                }
            </Navbar>
            <CustomColorPicker autoColor={autoColor} currentColor={borderColor} onAddNewColor={onAddNewColor}/>
        </Page>
    )
};

const PageBorderColor = props => {
    const { t } = useTranslation();
    const storeTableSettings = props.storeTableSettings;
    const borderColor = storeTableSettings.cellBorderColor;
    const customColors = props.storePalette.customColors;

    const changeColor = (color, effectId, effectValue) => {
        if (color !== 'empty') {
            storeTableSettings.setAutoColor(null);
            if (effectId !==undefined ) {
                const newColor = {color: color, effectId: effectId, effectValue: effectValue};
                storeTableSettings.updateCellBorderColor(newColor);
            } else {
                storeTableSettings.updateCellBorderColor(color);
            }
        } else {
            // open custom color menu
            props.f7router.navigate('/edit-table-custom-border-color/');
        }
    };

    return (
        <Page>
            <Navbar title={t('View.Edit.textColor')} backLink={t('View.Edit.textBack')}>
                {Device.phone &&
                    <NavRight>
                        <Link sheetClose='#edit-sheet'>
                            {Device.ios ? 
                                <SvgIcon symbolId={IconExpandDownIos.id} className={'icon icon-svg'} /> :
                                <SvgIcon symbolId={IconExpandDownAndroid.id} className={'icon icon-svg'} />
                            }
                        </Link>
                    </NavRight>
                }
            </Navbar>
            <List>
                <ListItem className={'item-color-auto' + (storeTableSettings.colorAuto === 'auto' ? ' active' : '')} title={t('View.Edit.textAutomatic')} onClick={() => {
                   storeTableSettings.setAutoColor('auto');
                }}>
                    <div slot="media">
                        <div id='font-color-auto' className={'color-auto'}></div>
                    </div>
                </ListItem>
            </List>
            <ThemeColorPalette changeColor={changeColor} curColor={storeTableSettings.colorAuto || borderColor} customColors={customColors}/>
            <List>
                <ListItem title={t('View.Edit.textAddCustomColor')} link={'/edit-table-custom-border-color/'}></ListItem>
            </List>
        </Page>
    )
};

const TabBorder = inject("storeFocusObjects", "storeTableSettings")(observer(props => {
    const { t } = useTranslation();
    const _t = t('View.Edit', {returnObjects: true});
    const storeTableSettings = props.storeTableSettings;
    const borderSizeTransform = storeTableSettings.borderSizeTransform();
    const borderSize = storeTableSettings.cellBorderWidth;
    const displayBorderSize = borderSizeTransform.indexSizeByValue(borderSize);
    const displayTextBorderSize = borderSizeTransform.sizeByValue(borderSize);
    const [stateBorderSize, setBorderSize] = useState(displayBorderSize);
    const [stateTextBorderSize, setTextBorderSize] = useState(displayTextBorderSize);

    const onBorderType = (type) => {
        storeTableSettings.updateBordersStyle(type);
        props.onBorderTypeClick(storeTableSettings.cellBorders);
    };

    const borderColor = storeTableSettings.cellBorderColor;
    const displayBorderColor = borderColor !== 'transparent' ? `#${(typeof borderColor === "object" ? borderColor.color : borderColor)}` : borderColor;

    return (
        <List>
            <ListItem>
                <div slot="root-start" className='inner-range-title'>{_t.textSize}</div>
                <div slot='inner' style={{width: '100%'}}>
                    <Range min="0" max="7" step="1" value={stateBorderSize}
                           onRangeChange={(value) => {
                               setBorderSize(value);
                               setTextBorderSize(borderSizeTransform.sizeByIndex(value));
                           }}
                           onRangeChanged={(value) => {storeTableSettings.updateCellBorderWidth(borderSizeTransform.sizeByIndex(value));}}
                    ></Range>
                </div>
                <div className='range-number' slot='inner-end'>
                    {stateTextBorderSize + ' ' + Common.Utils.Metric.getMetricName(Common.Utils.Metric.c_MetricUnits.pt)}
                </div>
            </ListItem>
            <ListItem title={_t.textColor} link='/edit-table-border-color/'>
                <span className="color-preview"
                      slot="after"
                      style={{ background: storeTableSettings.colorAuto === 'auto' ? '#000' : displayBorderColor}}
                ></span>
            </ListItem>
            <ListItem className='buttons table-presets'>
                <div className="row">
                    <a className={'item-link button'} onClick={() => {onBorderType("lrtbcm")}}>
                        {Device.ios ? 
                            <SvgIcon symbolId={IconTableBordersAllIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon symbolId={IconTableBordersAllAndroid.id} className={'icon icon-svg'} />
                        }
                    </a>
                    <a className={'item-link button'} onClick={() => {onBorderType("")}}>
                        {Device.ios ? 
                            <SvgIcon symbolId={IconTableBordersNoneIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon symbolId={IconTableBordersNoneAndroid.id} className={'icon icon-svg'} />
                        }
                    </a>
                    <a className={'item-link button'} onClick={() => {onBorderType("cm")}}>
                        {Device.ios ?
                            <SvgIcon symbolId={IconTableBordersInnerIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon symbolId={IconTableBordersInnerAndroid.id} className={'icon icon-svg'} />
                        }
                    </a>
                    <a className={'item-link button'} onClick={() => {onBorderType("lrtb")}}>
                        {Device.ios ?
                            <SvgIcon symbolId={IconTableBordersOuterIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon symbolId={IconTableBordersOuterAndroid.id} className={'icon icon-svg'} />
                        }
                    </a>
                    <a className={'item-link button'} onClick={() => {onBorderType("l")}}>
                        {Device.ios ?
                            <SvgIcon symbolId={IconTableBordersLeftIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon symbolId={IconTableBordersLeftAndroid.id} className={'icon icon-svg'} />
                        }
                    </a>
                </div>
            </ListItem>
            <ListItem className='buttons table-presets'>
                <div className="row">
                    <a className={'item-link button'} onClick={() => {onBorderType("c")}}>
                        {Device.ios ?
                            <SvgIcon symbolId={IconTableBordersCenterIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon symbolId={IconTableBordersCenterAndroid.id} className={'icon icon-svg'} />
                        }
                    </a>
                    <a className={'item-link button'} onClick={() => {onBorderType("r")}}>
                        {Device.ios ?
                            <SvgIcon symbolId={IconTableBordersRightIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon symbolId={IconTableBordersRightAndroid.id} className={'icon icon-svg'} />
                        }
                    </a>
                    <a className={'item-link button'} onClick={() => {onBorderType("t")}}>
                        {Device.ios ?
                            <SvgIcon symbolId={IconTableBordersTopIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon symbolId={IconTableBordersTopAndroid.id} className={'icon icon-svg'} />
                        }
                    </a>
                    <a className={'item-link button'} onClick={() => {onBorderType("m")}}>
                        {Device.ios ?
                            <SvgIcon symbolId={IconTableBordersMiddleIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon symbolId={IconTableBordersMiddleAndroid.id} className={'icon icon-svg'} />
                        }
                    </a>
                    <a className={'item-link button'} onClick={() => {onBorderType("b")}}>
                        {Device.ios ?
                            <SvgIcon symbolId={IconTableBordersBottomIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon symbolId={IconTableBordersBottomAndroid.id} className={'icon icon-svg'} />
                        }
                    </a>
                </div>
            </ListItem>
        </List>
    )
}));

const PageStyle = props => {
    const { t } = useTranslation();
    const _t = t('View.Edit', {returnObjects: true});
    const storeTableSettings = props.storeTableSettings;
    const templates = storeTableSettings.styles;
    const isAndroid = Device.android;

    return (
        <Page>
            <Navbar backLink={_t.textBack}>
                <div className="tab-buttons tabbar">
                    <Link key={"pe-link-table-style"} tabLink={"#edit-table-style"} tabLinkActive={true}>{_t.textStyle}</Link>
                    <Link key={"pe-link-table-fill"} tabLink={"#edit-table-fill"}>{_t.textFill}</Link>
                    <Link key={"pe-link-table-border"} tabLink={"#edit-table-border"}>{_t.textBorder}</Link>
                    {isAndroid && <span className='tab-link-highlight'></span>}
                </div>
                {Device.phone &&
                    <NavRight>
                        <Link sheetClose='#edit-sheet'>
                            {Device.ios ? 
                                <SvgIcon symbolId={IconExpandDownIos.id} className={'icon icon-svg'} /> :
                                <SvgIcon symbolId={IconExpandDownAndroid.id} className={'icon icon-svg'} />
                            }
                        </Link>
                    </NavRight>
                }
            </Navbar>
            <Tabs animated>
                <Tab key={"pe-tab-table-style"} id={"edit-table-style"} className="page-content no-padding-top" tabActive={true}>
                    <List>
                        <ListItem>
                            <StyleTemplates onGetTableStylesPreviews={props.onGetTableStylesPreviews} templates={templates} onStyleClick={props.onStyleClick}/>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem title={_t.textStyleOptions} link={'/edit-table-style-options/'} routeProps={{
                            onCheckTemplateChange: props.onCheckTemplateChange,
                            onGetTableStylesPreviews: props.onGetTableStylesPreviews,
                        }}/>
                    </List>
                </Tab>
                <Tab key={"pe-tab-table-fill"} id={"edit-table-fill"} className="page-content no-padding-top">
                    <TabFillColor onFillColor={props.onFillColor} f7router={props.f7router}/>
                </Tab>
                <Tab key={"pe-tab-table-border"} id={"edit-table-border"} className="page-content no-padding-top">
                    <TabBorder onBorderTypeClick={props.onBorderTypeClick}/>
                </Tab>
            </Tabs>
        </Page>
    )
};

const PageReorder = props => {
    const { t } = useTranslation();
    const _t = t('View.Edit', {returnObjects: true});

    const tableObject = props.storeFocusObjects.tableObject;
    if (!tableObject && Device.phone) {
        $$('.sheet-modal.modal-in').length > 0 && f7.sheet.close();
        return null;
    }

    return (
        <Page>
            <Navbar title={t('View.Edit.textArrange')} backLink={_t.textBack}>
                {Device.phone &&
                    <NavRight>
                        <Link sheetClose='#edit-sheet'>
                            {Device.ios ? 
                                <SvgIcon symbolId={IconExpandDownIos.id} className={'icon icon-svg'} /> :
                                <SvgIcon symbolId={IconExpandDownAndroid.id} className={'icon icon-svg'} />
                            }
                        </Link>
                    </NavRight>
                }
            </Navbar>
            <List>
                <ListItem title={_t.textBringToForeground} link='#' onClick={() => {props.onReorder('all-up')}} className='no-indicator'>
                    {Device.ios ? 
                        <SvgIcon symbolId={IconMoveForegroundIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconMoveForegroundAndroid.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textSendToBackground} link='#' onClick={() => {props.onReorder('all-down')}} className='no-indicator'>
                    {Device.ios ?
                        <SvgIcon symbolId={IconMoveBackgroundIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconMoveBackgroundAndroid.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textMoveForward} link='#' onClick={() => {props.onReorder('move-up')}} className='no-indicator'>
                    {Device.ios ?
                        <SvgIcon symbolId={IconMoveForwardIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconMoveForwardAndroid.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textMoveBackward} link='#' onClick={() => {props.onReorder('move-down')}} className='no-indicator'>
                    {Device.ios ?
                        <SvgIcon symbolId={IconMoveBackwardIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconMoveBackwardAndroid.id} className={'icon icon-svg'} />
                    }
                </ListItem>
            </List>
        </Page>
    )
};

const PageAlign = props => {
    const { t } = useTranslation();
    const _t = t('View.Edit', {returnObjects: true});

    const tableObject = props.storeFocusObjects.tableObject;
    if (!tableObject && Device.phone) {
        $$('.sheet-modal.modal-in').length > 0 && f7.sheet.close();
        return null;
    }

    return (
        <Page>
            <Navbar title={_t.textAlign} backLink={_t.textBack}>
                {Device.phone &&
                    <NavRight>
                        <Link sheetClose='#edit-sheet'>
                            {Device.ios ?
                                <SvgIcon symbolId={IconExpandDownIos.id} className={'icon icon-svg'} /> :
                                <SvgIcon symbolId={IconExpandDownAndroid.id} className={'icon icon-svg'} />
                            }
                        </Link>
                    </NavRight>
                }
            </Navbar>
            <List>
                <ListItem title={_t.textAlignLeft} link='#' onClick={() => {props.onAlign('align-left')}} className='no-indicator'>
                    {Device.ios ?
                        <SvgIcon symbolId={IconAlignLeftIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconAlignLeftAndroid.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textAlignCenter} link='#' onClick={() => {props.onAlign('align-center')}} className='no-indicator'>
                    {Device.ios ?
                        <SvgIcon symbolId={IconAlignCenterIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconAlignCenterAndroid.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textAlignRight} link='#' onClick={() => {props.onAlign('align-right')}} className='no-indicator'>
                    {Device.ios ?
                        <SvgIcon symbolId={IconAlignRightIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconAlignRightAndroid.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textAlignTop} link='#' onClick={() => {props.onAlign('align-top')}} className='no-indicator'>
                    {Device.ios ?
                        <SvgIcon symbolId={IconAlignTopIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconAlignTopAndroid.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textAlignMiddle} link='#' onClick={() => {props.onAlign('align-middle')}} className='no-indicator'>
                    {Device.ios ?
                        <SvgIcon symbolId={IconAlignMiddleIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconAlignMiddleAndroid.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textAlignBottom} link='#' onClick={() => {props.onAlign('align-bottom')}} className='no-indicator'>
                    {Device.ios ?
                        <SvgIcon symbolId={IconAlignBottomIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconAlignBottomAndroid.id} className={'icon icon-svg'} />
                    }
                </ListItem>
            </List>
            <List>
                <ListItem title={_t.textDistributeHorizontally} link='#' onClick={() => {props.onAlign('distrib-hor')}} className='no-indicator'>
                    {Device.ios ?
                        <SvgIcon symbolId={IconAlignHorizontalIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconAlignHorizontalAndroid.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textDistributeVertically} link='#' onClick={() => {props.onAlign('distrib-vert')}} className='no-indicator'>
                    {Device.ios ?
                        <SvgIcon symbolId={IconAlignVerticalIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconAlignVerticalAndroid.id} className={'icon icon-svg'} />
                    }
                </ListItem>
            </List>
        </Page>
    )
};

const EditTable = props => {
    const { t } = useTranslation();
    const _t = t('View.Edit', {returnObjects: true});
    const metricText = Common.Utils.Metric.getCurrentMetricName();
    const storeFocusObjects = props.storeFocusObjects;
    const tableObject = storeFocusObjects.tableObject;
    const storeTableSettings = props.storeTableSettings;
    const distance = Common.Utils.Metric.fnRecalcFromMM(storeTableSettings.getCellMargins(tableObject));
    const [stateDistance, setDistance] = useState(distance);

    return (
        <Fragment>
            <List>
                <ListItem className='buttons'>
                    <div className="row">
                        <a className={'item-link button'} onClick={() => {props.onAddColumnLeft()}}>
                            {Device.ios ? 
                                <SvgIcon symbolId={IconTableAddColumnLeftIos.id} className={'icon icon-svg'} /> :
                                <SvgIcon symbolId={IconTableAddColumnLeftAndroid.id} className={'icon icon-svg'} />
                            }
                        </a>
                        <a className={'item-link button'} onClick={() => {props.onAddColumnRight()}}>
                            {Device.ios ? 
                                <SvgIcon symbolId={IconTableAddColumnRightIos.id} className={'icon icon-svg'} /> :
                                <SvgIcon symbolId={IconTableAddColumnRightAndroid.id} className={'icon icon-svg'} />
                            }
                        </a>
                        <a className={'item-link button'} onClick={() => {props.onAddRowAbove()}}>
                            {Device.ios ? 
                                <SvgIcon symbolId={IconTableAddRowAboveIos.id} className={'icon icon-svg'} /> :
                                <SvgIcon symbolId={IconTableAddRowAboveAndroid.id} className={'icon icon-svg'} />
                            }
                        </a>
                        <a className={'item-link button'} onClick={() => {props.onAddRowBelow()}}>
                            {Device.ios ? 
                                <SvgIcon symbolId={IconTableAddRowBelowIos.id} className={'icon icon-svg'} /> :
                                <SvgIcon symbolId={IconTableAddRowBelowAndroid.id} className={'icon icon-svg'} />
                            }
                        </a>
                    </div>
                </ListItem>
                <ListItem className='buttons'>
                    <div className="row">
                        <a className={'item-link button'} onClick={() => {props.onRemoveColumn()}}>
                            {Device.ios ? 
                                <SvgIcon symbolId={IconTableRemoveColumnIos.id} className={'icon icon-svg'} /> :
                                <SvgIcon symbolId={IconTableRemoveColumnAndroid.id} className={'icon icon-svg'} />
                            }
                        </a>
                        <a className={'item-link button'} onClick={() => {props.onRemoveRow()}}>
                            {Device.ios ? 
                                <SvgIcon symbolId={IconTableRemoveRowIos.id} className={'icon icon-svg'} /> :
                                <SvgIcon symbolId={IconTableRemoveRowAndroid.id} className={'icon icon-svg'} />
                            }
                        </a>
                    </div>
                </ListItem>
                <List className="buttons-list">
                    <ListButton title={_t.textRemoveTable} onClick={() => {props.onRemoveTable()}} className='button-red button-fill button-raised'></ListButton>
                </List>
            </List>
            <List>
                <ListItem title={_t.textStyle} link='/edit-table-style/' routeProps={{
                    onStyleClick: props.onStyleClick,
                    onCheckTemplateChange: props.onCheckTemplateChange,
                    onGetTableStylesPreviews: props.onGetTableStylesPreviews,
                    onFillColor: props.onFillColor,
                    onBorderTypeClick: props.onBorderTypeClick
                }}></ListItem>
                 <ListItem title={t('View.Edit.textArrange')} link="/edit-table-reorder/" routeProps={{
                    onReorder: props.onReorder
                }}></ListItem>
                <ListItem title={_t.textAlign} link="/edit-table-align/" routeProps={{
                    onAlign: props.onAlign
                }}></ListItem>
                <BlockTitle>{_t.textCellMargins}</BlockTitle>
                <List>
                    <ListItem>
                        <div slot='inner' style={{width: '100%'}}>
                            <Range min={0} max={200} step={1} value={stateDistance}
                                onRangeChange={(value) => {setDistance(value)}}
                                onRangeChanged={(value) => {props.onOptionMargin(value)}}
                            ></Range>
                        </div>
                        <div className='range-number' slot='inner-end'>
                            {stateDistance + ' ' + metricText}
                        </div>
                    </ListItem>
                </List>
            </List>
        </Fragment>
    )
};

const EditTableContainer = inject("storeFocusObjects", "storeTableSettings")(observer(EditTable));
const PageTableStyle = inject("storeFocusObjects","storeTableSettings")(observer(PageStyle));
const PageTableStyleOptions = inject("storeFocusObjects","storeTableSettings")(observer(PageStyleOptions));
const PageTableCustomFillColor = inject("storeFocusObjects","storeTableSettings", "storePalette")(observer(PageCustomFillColor));
const PageTableBorderColor = inject("storeFocusObjects","storeTableSettings", "storePalette")(observer(PageBorderColor));
const PageTableCustomBorderColor = inject("storeFocusObjects","storeTableSettings", "storePalette")(observer(PageCustomBorderColor));
const PageTableReorder = inject("storeFocusObjects")(observer(PageReorder));
const PageTableAlign = inject("storeFocusObjects")(observer(PageAlign));

export {
    EditTableContainer as EditTable,
    PageTableStyle,
    PageTableStyleOptions,
    PageTableCustomFillColor,
    PageTableBorderColor,
    PageTableCustomBorderColor,
    PageTableReorder,
    PageTableAlign
}