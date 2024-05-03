import style from './style.module.scss'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Header() {

  const router = useRouter();

  function logout() {
    localStorage.clear();
    router.push('/');
  }

  return (
    <>
      <header className={style.header}>

        <nav className={style.nav}>

          <ul className={style.list}>

            <li>
              <Link href="/">
                Home
              </Link>
            </li>            

            <li className={style.logout} onClick={logout}>
              Logout
            </li>

          </ul>

        </nav>

      </header>
    </>
  )
}