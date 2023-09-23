import Header from "@/components/general/server/header"


export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}
