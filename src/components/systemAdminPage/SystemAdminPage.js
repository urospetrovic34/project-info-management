import React from 'react';
import Button from '../elements/button/Button';
import Header from '../elements/navigation/header/Header';
import { Pagination } from '../elements/pagination/Pagination';
import AsyncSearchBar from '../elements/searchBar/AsyncSearchBar';
import { Select } from '../elements/select/Select';
import UserCard from '../elements/userCard/UserCard';
import SystemAdminPageCSS from "../systemAdminPage/SystemAdminPage.module.css";

const SystemAdminPage = () => {
    return (
        <div className={SystemAdminPageCSS.container}>
            <div className={SystemAdminPageCSS.flex}>
                <div className={SystemAdminPageCSS.search_container}>
                    <Select />
                    <div className={SystemAdminPageCSS.searchBar}>
                        <AsyncSearchBar />
                    </div>
                </div>
                <div className={SystemAdminPageCSS.btn}>
                    <Button text='ADD NEW USER' />
                </div>
            </div>
            <div className={SystemAdminPageCSS.userCard_container}>
                <UserCard />

            </div>
        </div>
    )
}






export default SystemAdminPage