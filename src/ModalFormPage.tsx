import React, { useRef } from "react";
import { DefaultFormModal } from './modal/defaultFormModal/DefaultFormModal';
import { useDefaultFormModal } from "./modal/defaultFormModal/store";

const ModalFormPage = () => {
  /* 여기에 구현해 주세요 */
  const formModal = useDefaultFormModal();

  const handleModal = async () => {
    console.log('OPEN');
    const result = await formModal.open();
    console.log('CLOSE', result);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={handleModal}>
        신청 폼 작성하기
      </button>

      <DefaultFormModal modal={formModal} />
    </div >
  );
};

export default ModalFormPage;
