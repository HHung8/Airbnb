'use client';

import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import RentModal from "../components/modals/RentModal";
import SearchModal from "../components/modals/SearchModal";

const ModalsProvodier = () => {
    return (
        <>
            <LoginModal />
            <RegisterModal />
            <SearchModal />
            <RentModal />
        </>
    )
}

export default ModalsProvodier