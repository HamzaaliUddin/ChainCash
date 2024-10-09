import React from "react";
import Modal from "@/components/Modal";
import Image from "next/image";

export default function PayModal({ viewModal, onClose, data }: { viewModal: boolean; onClose: () => void; data: any }) {
    return (
        <Modal visible={viewModal} onClose={onClose}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image src={data?.pix?.qrcode || ""} alt="" width={300} height={300} style={{width:'100%', height:'100%'}} />
        </Modal>
    )
}