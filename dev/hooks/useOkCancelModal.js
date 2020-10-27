import React, {useState} from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function useOkCancelModal(modalTitle, modalBody, handleOk) {

    const [visible, setVisible] = useState(false)

    return {

        show: function() { setVisible(true) },
        hide: function() { setVisible(false) },

        render: function() {
            return (
                <Modal show={visible} onHide={this.hide}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modalBody()}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => { handleOk(); this.hide(); } }>Ok</Button>
                        <Button variant="secondary" onClick={this.hide}>Отмена</Button>
                    </Modal.Footer>
                </Modal>
            )
        },

    }

}