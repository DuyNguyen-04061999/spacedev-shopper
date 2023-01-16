import { Drawer as DrawerM } from 'antd'

export const Drawer = ({ title, children, open, onClose, width = 470 }) => {
    return (
        <DrawerM onClose={onClose} headerStyle={{ display: 'none' }} bodyStyle={{ padding: 0 }} width={width} open={open} onClose={onClose}>
            <div className="modal-content">
                {/* Close */}
                <button onClick={onClose} type="button" className="close !outline-none" data-dismiss="modal" aria-label="Close">
                    <i className="fe fe-x" aria-hidden="true" />
                </button>
                {/* Header*/}
                <div className="modal-header line-height-fixed font-size-lg">
                    <strong className="mx-auto">{title}</strong>
                </div>
                {children}
            </div>
        </DrawerM>
    )
}
