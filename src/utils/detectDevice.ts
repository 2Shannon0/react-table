export function detectAppleDevice(userAgent: string): boolean {
    if (/macintosh/i.test(userAgent) && 'ontouchend' in document) {
        // Mac с сенсорным экраном (например, iPad на macOS)
        return true;

    } else if (/macintosh/i.test(userAgent)) {
        // Mac без сенсорного экрана
        return true;

    } else if (/ipad/i.test(userAgent)) {
        // Планшет на iOS или iPadOS
        return true;

    } else if (/iphone/i.test(userAgent) || /ipod/i.test(userAgent)) {
        // Другие устройства на iOS, например, iPhone или iPod
        return true;
    }

    return false;
}
