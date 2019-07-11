import React from 'react';
import ManageBrands from './manage_brands';
import ManageWoods from './manage_woods';

import UserLayout from '../../../hoc/userLayout';

const ManageCategories = () => {
    return (
       <UserLayout>
           <ManageBrands/>
           <ManageWoods/>
       </UserLayout>
    );
};

export default ManageCategories;