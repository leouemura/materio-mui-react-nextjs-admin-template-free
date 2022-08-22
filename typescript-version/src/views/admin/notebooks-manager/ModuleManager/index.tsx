import React from 'react';
import { Module, ModulesTable } from '../ModulesTable';
import TabFormModules from '../TabFormModules';


export const ModuleManager: React.FC = () => {
    const [page, setPage] = React.useState<string>("list")
    const [moduleData, setModuleData] = React.useState<Module>()
    console.log(page)
    return (
        <>
            {page === "list" && (
                <ModulesTable onModuleUpdate={setModuleData} /*onModulesDelete={null}*/ setPage={setPage} />
            )}
            {page === "edit" && (
                <TabFormModules moduleData={moduleData} clearData={setModuleData} setPage={setPage} page={page} />
            )}
            {page === "create" && (
                <TabFormModules moduleData={moduleData} clearData={setModuleData} setPage={setPage} page={page} />
            )}
        </>
    )
}
