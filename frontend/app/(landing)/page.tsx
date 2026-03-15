import Image from "next/image"
import Link from "next/link"
import Logo from "../../public/logo.png"

export default function Page() {
	return (
		<div>
			<Image
				src={Logo}
				alt="logo.png"
				width={0}
				height={0}
				sizes="100vw"
				style={{ width: 'auto', height: '100%' }}
			/>
			<Link href="/login">
				<button type="button">
					Login
				</button>
			</Link>
			<Link href="/signup">Signup</Link>
		</div>
	)
}