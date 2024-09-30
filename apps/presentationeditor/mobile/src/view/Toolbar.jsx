import React, {Fragment} from 'react';
import {NavLeft, NavRight, Link} from 'framework7-react';
import { Device } from '../../../../common/mobile/utils/device';
import EditorUIController from '../lib/patch'
import { useTranslation } from 'react-i18next';
import SvgIcon from '../../../../common/mobile/lib/component/SvgIcon';
import IconReturnIos from '@common-ios-icons/icon-return.svg';
import IconReturnAndroid from '@common-android-icons/icon-return.svg';
import IconPlayIos from '@ios-icons/icon-play.svg';
import IconPlayAndroid from '@android-icons/icon-play.svg';
import IconEditIos from '@common-ios-icons/icon-edit.svg';
import IconEditAndroid from '@common-android-icons/icon-edit.svg';
import IconSearchIos from '@common-icons/icon-search.svg';
import IconSearchAndroid from '@common-android-icons/icon-search.svg';
import IconCollaborationIos from '@common-icons/icon-collaboration.svg';
import IconCollaborationAndroid from '@common-android-icons/icon-collaboration.svg';
import IconSettingsIos from '@common-ios-icons/icon-settings.svg';
import IconSettingsAndroid from '@common-android-icons/icon-settings.svg';

const ToolbarView = props => {
    const { t } = useTranslation();
    const isDisconnected = props.isDisconnected;
    const docTitle = props.docTitle;
    const isVersionHistoryMode = props.isVersionHistoryMode;
    const isOpenModal = props.isOpenModal;

    return (
        <Fragment>
            <NavLeft>
                {(props.isShowBack && !isVersionHistoryMode) && <Link className={`btn-doc-back${(props.disabledControls || isOpenModal) && ' disabled'}`} onClick={() => Common.Notifications.trigger('goback')}>
                    {Device.ios ? 
                        <SvgIcon slot="media" symbolId={IconReturnIos.id} className={'icon icon-svg'} /> : 
                        <SvgIcon slot="media" symbolId={IconReturnAndroid.id} className={'icon icon-svg'} />
                    }
                </Link>}
                {isVersionHistoryMode ? <a href="#" className='btn-close-history' onClick={(e) => {
                    e.preventDefault();
                    props.closeHistory();
                }}>{t("Toolbar.textCloseHistory")}</a> : null}
                {(Device.ios && props.isEdit && !isVersionHistoryMode) && EditorUIController.getUndoRedo && EditorUIController.getUndoRedo({
                    disabledUndo: !props.isCanUndo || isDisconnected,
                    disabledRedo: !props.isCanRedo || isDisconnected,
                    onUndoClick: props.onUndo,
                    onRedoClick: props.onRedo
                })}
            </NavLeft>
            {(!Device.phone && !isVersionHistoryMode) && 
                <div className='title' onClick={() => props.changeTitleHandler()} style={{width: '71%'}}>
                    {docTitle}
                </div>
            }
            <NavRight>
                {(Device.android && props.isEdit && EditorUIController.getUndoRedo && !isVersionHistoryMode) && EditorUIController.getUndoRedo({
                    disabledUndo: !props.isCanUndo || isDisconnected,
                    disabledRedo: !props.isCanRedo || isDisconnected,
                    onUndoClick: props.onUndo,
                    onRedoClick: props.onRedo
                })}
                {!isVersionHistoryMode &&
                    <Link className={(props.disabledControls || props.disabledPreview || isOpenModal) && 'disabled'} href={false} onClick={() => {props.openOptions('preview')}}>
                        {Device.ios ? 
                            <SvgIcon symbolId={IconPlayIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon symbolId={IconPlayAndroid.id} className={'icon icon-svg'} />
                        }
                    </Link>
                }
                {(props.showEditDocument && !isVersionHistoryMode) &&
                    <Link className={(props.disabledControls || isOpenModal) ? 'disabled' : ''} href={false} onClick={props.onEditDocument}>
                        {Device.ios ? 
                            <SvgIcon symbolId={IconEditIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon symbolId={IconEditAndroid.id} className={'icon icon-svg'} />
                        }
                    </Link>
                }
                {(props.isEdit && EditorUIController.getToolbarOptions && !isVersionHistoryMode) && EditorUIController.getToolbarOptions({
                    disabledEdit: props.disabledEdit || props.disabledControls || isDisconnected || props.disabledPreview || isOpenModal,
                    disabledAdd: props.disabledControls || isDisconnected || isOpenModal,
                    onEditClick: () => props.openOptions('edit'),
                    onAddClick: () => props.openOptions('add')
                })}
                {Device.phone ? null : <Link className={(props.disabledControls || props.disabledPreview || isOpenModal) && 'disabled'} searchbarEnable='.searchbar' href={false}>
                    {Device.ios ? 
                        <SvgIcon symbolId={IconSearchIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconSearchAndroid.id} className={'icon icon-svg'} />
                    }
                </Link>}
                {props.displayCollaboration && window.matchMedia("(min-width: 375px)").matches && !isVersionHistoryMode ? <Link className={(props.disabledControls || isOpenModal) && 'disabled'} id='btn-coauth' href={false} onClick={() => props.openOptions('coauth')}>
                    {Device.ios ?
                        <SvgIcon symbolId={IconCollaborationIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconCollaborationAndroid.id} className={'icon icon-svg'} />
                    }
                </Link> : null}
                {isVersionHistoryMode ? 
                    <Link id='btn-open-history' href={false} className={isOpenModal && 'disabled'} onClick={() => props.openOptions('history')}>
                        {Device.ios ? 
                            <SvgIcon symbolId={IconHistoryIos.id} className={'icon icon-svg'} /> :
                            <SvgIcon symbolId={IconHistoryAndroid.id} className={'icon icon-svg'} />
                        }
                    </Link> 
                : null}
                <Link className={(props.disabledSettings || props.disabledControls || isDisconnected || isOpenModal) && 'disabled'} id='btn-settings' href={false} onClick={() => props.openOptions('settings')}>
                    {Device.ios ? 
                        <SvgIcon symbolId={IconSettingsIos.id} className={'icon icon-svg'} /> :
                        <SvgIcon symbolId={IconSettingsAndroid.id} className={'icon icon-svg'} />
                    }
                </Link>
            </NavRight>
        </Fragment>
    )
};

export default ToolbarView;