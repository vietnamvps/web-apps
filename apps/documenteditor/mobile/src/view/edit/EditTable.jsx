import React, {Fragment, useState, useEffect} from 'react';
import {observer, inject} from "mobx-react";
import {Page, Navbar, NavRight, List, ListItem, ListButton, BlockTitle, SkeletonBlock, Range, Toggle, Icon, Link, Tabs, Tab} from 'framework7-react';
import { f7 } from 'framework7-react';
import { useTranslation } from 'react-i18next';
import {Device} from '../../../../../common/mobile/utils/device';
import {CustomColorPicker, ThemeColorPalette} from "../../../../../common/mobile/lib/component/ThemeColorPalette.jsx";
import SvgIcon from '../../../../../common/mobile/lib/component/SvgIcon.jsx';
import IconWrapTableInline from '@ios-icons/icon-wrap-table-inline.svg';
import IconWrapTableFlow from '@ios-icons/icon-wrap-table-flow.svg';
import IconBlockAlignLeftIos from '@ios-icons/icon-block-align-left.svg';
import IconBlockAlignLeftAndroid from '@android-icons/icon-block-align-left.svg';
import IconBlockAlignCenterIos from '@ios-icons/icon-block-align-center.svg';
import IconBlockAlignCenterAndroid from '@android-icons/icon-block-align-center.svg';
import IconBlockAlignRightIos from '@ios-icons/icon-block-align-right.svg';
import IconBlockAlignRightAndroid from '@android-icons/icon-block-align-right.svg';
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
import IconTableBordersTopIos from '@common-ios-icons/icon-table-borders-top.svg';
import IconTableBordersTopAndroid from '@common-android-icons/icon-table-borders-top.svg';
import IconTableBordersBottomIos from '@common-ios-icons/icon-table-borders-bottom.svg';
import IconTableBordersBottomAndroid from '@common-android-icons/icon-table-borders-bottom.svg';
import IconTableBordersLeftIos from '@common-ios-icons/icon-table-borders-left.svg';
import IconTableBordersLeftAndroid from '@common-android-icons/icon-table-borders-left.svg';
import IconTableBordersRightIos from '@common-ios-icons/icon-table-borders-right.svg';
import IconTableBordersRightAndroid from '@common-android-icons/icon-table-borders-right.svg';
import IconTableBordersCenterIos from '@common-ios-icons/icon-table-borders-center.svg';
import IconTableBordersCenterAndroid from '@common-android-icons/icon-table-borders-center.svg';
import IconTableBordersMiddleIos from '@common-ios-icons/icon-table-borders-middle.svg';
import IconTableBordersMiddleAndroid from '@common-android-icons/icon-table-borders-middle.svg';
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

const PageTableOptions = props => {
    const { t } = useTranslation();
    const _t = t('Edit', {returnObjects: true});
    const metricText = Common.Utils.Metric.getCurrentMetricName();
    const storeFocusObjects = props.storeFocusObjects;
    const tableObject = storeFocusObjects.tableObject;
    const storeTableSettings = props.storeTableSettings;

    let distance, isRepeat, isResize;
    if (tableObject) {
        distance = Common.Utils.Metric.fnRecalcFromMM(storeTableSettings.getCellMargins(tableObject));
        isRepeat = storeTableSettings.getRepeatOption(tableObject);
        isResize = storeTableSettings.getResizeOption(tableObject);
    }
    const [stateDistance, setDistance] = useState(distance);

    if (!tableObject && Device.phone) {
        $$('.sheet-modal.modal-in').length > 0 && f7.sheet.close();
        return null;
    }

    return (
        <Page>
            <Navbar title={_t.textOptions} backLink={_t.textBack}>
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
                <ListItem title={_t.textRepeatAsHeaderRow} className={isRepeat === null ? 'disabled' : ''}>
                    <Toggle checked={isRepeat} onToggleChange={() => {props.onOptionRepeat(!isRepeat)}}/>
                </ListItem>
                <ListItem title={_t.textResizeToFitContent}>
                    <Toggle checked={isResize} onToggleChange={() => {props.onOptionResize(!isResize)}}/>
                </ListItem>
            </List>
            <BlockTitle>{_t.textCellMargins}</BlockTitle>
            <List>
                <ListItem>
                    <div slot='inner' style={{width: '100%'}}>
                        <Range min={0} max={200} step={1} value={stateDistance}
                               onRangeChange={(value) => {setDistance(value)}}
                               onRangeChanged={(value) => {props.onCellMargins(value)}}
                        ></Range>
                    </div>
                    <div className='range-number' slot='inner-end'>
                        {stateDistance + ' ' + metricText}
                    </div>
                </ListItem>
            </List>
        </Page>
    )
};

const PageWrap = props => {
    const c_tableWrap = {
        TABLE_WRAP_NONE: 0,
        TABLE_WRAP_PARALLEL: 1
    };
    const c_tableAlign = {
        TABLE_ALIGN_LEFT: 0,
        TABLE_ALIGN_CENTER: 1,
        TABLE_ALIGN_RIGHT: 2
    };
    const isAndroid = Device.android;
    const { t } = useTranslation();
    const _t = t('Edit', {returnObjects: true});
    const storeTableSettings = props.storeTableSettings;
    const tableObject = props.storeFocusObjects.tableObject;
    let wrapType, align, moveText, distance;
    if (tableObject) {
        wrapType = storeTableSettings.getWrapType(tableObject);
        align = storeTableSettings.getAlign(tableObject);
        moveText = storeTableSettings.getMoveText(tableObject);
        distance = Common.Utils.Metric.fnRecalcFromMM(storeTableSettings.getWrapDistance(tableObject));
    }
    const metricText = Common.Utils.Metric.getCurrentMetricName();
    const [stateDistance, setDistance] = useState(distance);

    if (!tableObject && Device.phone) {
        $$('.sheet-modal.modal-in').length > 0 && f7.sheet.close();
        return null;
    }

    return (
        <Page>
            <Navbar title={_t.textWrap} backLink={_t.textBack}>
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
                <ListItem title={_t.textInline} radio checked={wrapType === 'inline'} onChange={() => {props.onWrapType(c_tableWrap.TABLE_WRAP_NONE)}}>
                    {!isAndroid && 
                        <SvgIcon symbolId={IconWrapTableInline.id} className={'icon icon-svg'} />
                    }
                </ListItem>
                <ListItem title={_t.textFlow} radio checked={wrapType === 'flow'} onChange={() => {props.onWrapType(c_tableWrap.TABLE_WRAP_PARALLEL)}}>
                    {!isAndroid && 
                        <SvgIcon symbolId={IconWrapTableFlow.id} className={'icon icon-svg'} />
                    }
                </ListItem>
            </List>
            <List>
                <ListItem title={_t.textMoveWithText} className={'inline' === wrapType ? 'disabled' : ''}>
                    <Toggle checked={moveText} onToggleChange={() => {props.onWrapMoveText(!moveText)}}/>
                </ListItem>
            </List>
            {
                wrapType === 'inline' &&
                <Fragment>
                    <BlockTitle>{_t.textAlign}</BlockTitle>
                    <List>
                        <ListItem className='buttons'>
                            <div className="row">
                                <a className={'button' + (align === c_tableAlign.TABLE_ALIGN_LEFT ? ' active' : '')}
                                   onClick={() => {
                                       props.onWrapAlign(c_tableAlign.TABLE_ALIGN_LEFT)
                                   }}>
                                    {Device.ios ? 
                                        <SvgIcon symbolId={IconBlockAlignLeftIos.id} className={'icon icon-svg'} /> :
                                        <SvgIcon symbolId={IconBlockAlignLeftAndroid.id} className={'icon icon-svg'} />
                                    }
                                </a>
                                <a className={'button' + (align === c_tableAlign.TABLE_ALIGN_CENTER ? ' active' : '')}
                                   onClick={() => {
                                       props.onWrapAlign(c_tableAlign.TABLE_ALIGN_CENTER)
                                   }}>
                                    {Device.ios ? 
                                        <SvgIcon symbolId={IconBlockAlignCenterIos.id} className={'icon icon-svg'} /> :
                                        <SvgIcon symbolId={IconBlockAlignCenterAndroid.id} className={'icon icon-svg'} />
                                    }
                                </a>
                                <a className={'button' + (align === c_tableAlign.TABLE_ALIGN_RIGHT ? ' active' : '')}
                                   onClick={() => {
                                       props.onWrapAlign(c_tableAlign.TABLE_ALIGN_RIGHT)
                                   }}>
                                    {Device.ios ? 
                                        <SvgIcon symbolId={IconBlockAlignRightIos.id} className={'icon icon-svg'} /> :
                                        <SvgIcon symbolId={IconBlockAlignRightAndroid.id} className={'icon icon-svg'} />
                                    }
                                </a>
                            </div>
                        </ListItem>
                    </List>
                </Fragment>
            }
            {
                (wrapType === 'flow') &&
                <Fragment>
                    <BlockTitle>{_t.textDistanceFromText}</BlockTitle>
                    <List>
                        <ListItem>
                            <div slot='inner' style={{width: '100%'}}>
                                <Range min={0} max={200} step={1} value={stateDistance}
                                       onRangeChange={(value) => {setDistance(value)}}
                                       onRangeChanged={(value) => {props.onWrapDistance(value)}}
                                ></Range>
                            </div>
                            <div className='range-number' slot='inner-end'>
                                {stateDistance + ' ' + metricText}
                            </div>
                        </ListItem>
                    </List>
                </Fragment>
            }
        </Page>
    )
};

// Style

const StyleTemplates = inject("storeFocusObjects","storeTableSettings")(observer(({onStyleClick,storeTableSettings,storeFocusObjects, onGetTableStylesPreviews}) => {
    const tableObject = storeFocusObjects.tableObject;
    const styleId = tableObject && tableObject.get_TableStyle();
    const [stateId, setId] = useState(styleId);
    const styles =  storeTableSettings.arrayStyles;

    useEffect(() => {
        if(!styles.length) onGetTableStylesPreviews();
    }, []);

    return (
        <div className="dataview table-styles">
            <ul className="row">
                { !styles.length ?
                        Array.from({ length: 27 }).map((item,index) => (
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
    const _t = t('Edit', {returnObjects: true});
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
    const _t = t('Edit', {returnObjects: true});
    const tableObject = props.storeFocusObjects.tableObject;
    let fillColor;
    if (tableObject) {
        fillColor = props.storeTableSettings.getFillColor(tableObject);
        if (typeof fillColor === 'object') {
            fillColor = fillColor.color;
        }
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
    const _t = t('Edit', {returnObjects: true});
    const tableObject = props.storeFocusObjects.tableObject;
    const fillColor = props.storeTableSettings.getFillColor(tableObject);
    const customColors = props.storePalette.customColors;
    const changeColor = (color, effectId, effectValue) => {
        if (color !== 'empty') {
            if (effectId !==undefined ) {
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
    return(
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
    const _t = t('Edit', {returnObjects: true});
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
    return(
        <Page>
            <Navbar title={t('Edit.textColor')} backLink={t('Edit.textBack')}>
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
                <ListItem className={'item-color-auto' + (storeTableSettings.colorAuto === 'auto' ? ' active' : '')} title={t('Edit.textAutomatic')} onClick={() => {
                   storeTableSettings.setAutoColor('auto');
                }}>
                    <div slot="media">
                        <div id='font-color-auto' className={'color-auto'}></div>
                    </div>
                </ListItem>
            </List>
            <ThemeColorPalette changeColor={changeColor} curColor={storeTableSettings.colorAuto || borderColor} customColors={customColors}/>
            <List>
                <ListItem title={t('Edit.textAddCustomColor')} link={'/edit-table-custom-border-color/'}></ListItem>
            </List>
        </Page>
    )
};

const TabBorder = inject("storeFocusObjects", "storeTableSettings")(observer(props => {
    const { t } = useTranslation();
    const _t = t('Edit', {returnObjects: true});

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
    const _t = t('Edit', {returnObjects: true});
    const storeTableSettings = props.storeTableSettings;
    const templates = storeTableSettings.styles;
    const isAndroid = Device.android;

    const tableObject = props.storeFocusObjects.tableObject;
    if (!tableObject && Device.phone) {
        $$('.sheet-modal.modal-in').length > 0 && f7.sheet.close();
        return null;
    }

    return (
        <Page>
            <Navbar backLink={_t.textBack}>
                <div className="tab-buttons tabbar">
                    <Link key={"de-link-table-style"} tabLink={"#edit-table-style"} tabLinkActive={true}>{_t.textStyle}</Link>
                    <Link key={"de-link-table-fill"} tabLink={"#edit-table-fill"}>{_t.textFill}</Link>
                    <Link key={"de-link-table-border"} tabLink={"#edit-table-border"}>{_t.textBorder}</Link>
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
                <Tab key={"de-tab-table-style"} id={"edit-table-style"} className="page-content no-padding-top" tabActive={true}>
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
                <Tab key={"de-tab-table-fill"} id={"edit-table-fill"} className="page-content no-padding-top">
                    <TabFillColor onFillColor={props.onFillColor}/>
                </Tab>
                <Tab key={"de-tab-table-border"} id={"edit-table-border"} className="page-content no-padding-top">
                    <TabBorder onBorderTypeClick={props.onBorderTypeClick}/>
                </Tab>
            </Tabs>
        </Page>
    )
};

const EditTable = props => {
    const { t } = useTranslation();
    const _t = t('Edit', {returnObjects: true});
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
                <ListItem title={_t.textTableOptions} link='/edit-table-options/' routeProps={{
                    onCellMargins: props.onCellMargins,
                    onOptionResize: props.onOptionResize,
                    onOptionRepeat: props.onOptionRepeat
                }}></ListItem>
                <ListItem title={_t.textStyle} link='/edit-table-style/' routeProps={{
                    onStyleClick: props.onStyleClick,
                    onCheckTemplateChange: props.onCheckTemplateChange,
                    onGetTableStylesPreviews: props.onGetTableStylesPreviews,
                    onFillColor: props.onFillColor,
                    onBorderTypeClick: props.onBorderTypeClick
                }}></ListItem>
                <ListItem title={_t.textWrap} link='/edit-table-wrap/' routeProps={{
                    onWrapType: props.onWrapType,
                    onWrapAlign: props.onWrapAlign,
                    onWrapMoveText: props.onWrapMoveText,
                    onWrapDistance: props.onWrapDistance
                }}></ListItem>
            </List>
        </Fragment>
    )
};

const EditTableContainer = inject("storeFocusObjects")(observer(EditTable));
const PageTableOptionsContainer = inject("storeFocusObjects","storeTableSettings")(observer(PageTableOptions));
const PageTableWrap = inject("storeFocusObjects","storeTableSettings")(observer(PageWrap));
const PageTableStyle = inject("storeFocusObjects","storeTableSettings")(observer(PageStyle));
const PageTableStyleOptions = inject("storeFocusObjects","storeTableSettings")(observer(PageStyleOptions));
const PageTableCustomFillColor = inject("storeFocusObjects","storeTableSettings", "storePalette")(observer(PageCustomFillColor));
const PageTableBorderColor = inject("storeFocusObjects","storeTableSettings", "storePalette")(observer(PageBorderColor));
const PageTableCustomBorderColor = inject("storeFocusObjects","storeTableSettings", "storePalette")(observer(PageCustomBorderColor));


export {EditTableContainer as EditTable,
        PageTableOptionsContainer as PageTableOptions,
        PageTableWrap,
        PageTableStyle,
        PageTableStyleOptions,
        PageTableCustomFillColor,
        PageTableBorderColor,
        PageTableCustomBorderColor}