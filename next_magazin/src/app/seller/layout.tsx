import HeaderSeller from "@/components/general/server/header.seller"


export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <HeaderSeller />
            {children}
        </>
    )
}
