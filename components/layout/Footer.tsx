export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">PinjamanApp</h3>
                        <p className="text-gray-400">
                            Solusi pinjaman online terpercaya untuk kebutuhan finansial Anda.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Link Cepat</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/" className="hover:text-white">Beranda</a></li>
                            <li><a href="/login" className="hover:text-white">Login</a></li>
                            <li><a href="/register" className="hover:text-white">Daftar</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Kontak</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Email: support@pinjamanapp.com</li>
                            <li>Telp: 0800-123-4567</li>
                            <li>Senin - Jumat: 09:00 - 17:00</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 PinjamanApp. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
