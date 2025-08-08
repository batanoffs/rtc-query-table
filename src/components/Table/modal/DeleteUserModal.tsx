import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, notification } from "antd";
import { useState } from "react";
import { Tooltip } from 'antd';

interface rowDataProps {
    userId: number;
}

export const DeleteUserModal = ({ userId }: rowDataProps) => {
    // const [deletePage] = useDeletePageMutation();
    // const [getPages] = useLazyGetPagesQuery();
    const [isOpen, setIsOpen] = useState(false);

    const onDelete = () => {
        Modal.confirm({
            title: 'Delete Page',
            content: `Are you sure that you want to delete page with ID: ${userId}?`,
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                deletePage(userId)
                    .unwrap()
                    .then(() => {
                        notification.success({
                            message: 'Success',
                            description: `Page with ID: ${userId} has been successfully deleted.`,
                        });

                        getPages();
                    })
                    .catch((error) => {
                        notification.error({
                            message: 'Error',
                            description: `Failed to delete page with ID ${userId}: ${error.message}`,
                        });
                    });
            },
        });
    };

    return (
        <Tooltip title="Delete Page">
            <Button color="danger" variant="outlined" icon={<DeleteOutlined />} onClick={onDelete} />
        </Tooltip>
    );
}

export default DeleteUserModal;
