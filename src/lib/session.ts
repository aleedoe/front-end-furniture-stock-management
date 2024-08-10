import 'server-only'
import { cookies } from 'next/headers'

export function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const sessionData = JSON.stringify({ userId, expiresAt })

    cookies().set('session', sessionData, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}