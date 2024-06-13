import NavMenu from "@/components/NavMenu";

export default function HomeLayout({ children }) {
  return (
    <div>
        <NavMenu/>
        {children}
    </div>
  )
}
