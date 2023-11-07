import { useState } from "react";

export function useCreateModal() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    function handleShowModal() {
        setShowCreateModal(true);
    }
    function handleCloseModal() {
        setShowCreateModal(false);
    }
    return { showCreateModal, handleShowModal, handleCloseModal };
}

export function useLoginModal() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    function handleShowLoginModal() {
        setShowLoginModal(true);
    }
    function handleCloseLoginModal() {
        setShowLoginModal(false);
    }
    return { showLoginModal, handleShowLoginModal, handleCloseLoginModal };
}

export function useSearchModal() {
    const [showSearchModal, setShowSearchModal] = useState(false);
    function handleShowSearchModal() {
        setShowSearchModal(true);
    }
    function handleCloseSearchModal() {
        setShowSearchModal(false);
    }
    return { showSearchModal, handleShowSearchModal, handleCloseSearchModal };
}