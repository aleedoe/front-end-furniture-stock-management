import { ScrollArea } from '@/components/ui/scroll-area'
import MainTable from '@/components/workspace/MainTable'
import React from 'react'

const userPage = () => {
    return (
        <>
            <ScrollArea className="h-80">
                <MainTable  />
            </ScrollArea>
        </>
    )
}

export default userPage