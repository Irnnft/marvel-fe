import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center text-white">
                    <h1 className="text-5xl font-bold mb-6">
                        Solusi Pinjaman Online Terpercaya
                    </h1>
                    <p className="text-xl mb-8 text-blue-100">
                        Proses cepat, aman, dan mudah. Dapatkan pinjaman Anda dalam hitungan menit!
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link
                            href="/register"
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
                        >
                            Daftar Sekarang
                        </Link>
                        <Link
                            href="/login"
                            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
                        >
                            Login
                        </Link>
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
                        <div className="text-4xl mb-4">⚡</div>
                        <h3 className="text-xl font-bold text-white mb-2">Proses Cepat</h3>
                        <p className="text-blue-100">
                            Pengajuan pinjaman diproses dalam 1-3 hari kerja
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
                        <div className="text-4xl mb-4">🔒</div>
                        <h3 className="text-xl font-bold text-white mb-2">Aman & Terpercaya</h3>
                        <p className="text-blue-100">
                            Data Anda dijamin aman dengan enkripsi tingkat tinggi
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
                        <div className="text-4xl mb-4">💰</div>
                        <h3 className="text-xl font-bold text-white mb-2">Bunga Kompetitif</h3>
                        <p className="text-blue-100">
                            Suku bunga rendah dengan tenor fleksibel 3-12 bulan
                        </p>
                    </div>
                </div>

                {/* Benefits */}
                <div className="bg-white rounded-lg shadow-xl p-8 mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                        Keuntungan Menggunakan Layanan Kami
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-4">
                            <span className="text-2xl">✓</span>
                            <div>
                                <h4 className="font-semibold text-lg mb-1">Persyaratan Mudah</h4>
                                <p className="text-gray-600">Hanya butuh KTP, NPWP, dan rekening bank</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="text-2xl">✓</span>
                            <div>
                                <h4 className="font-semibold text-lg mb-1">Limit Besar</h4>
                                <p className="text-gray-600">Pinjaman hingga Rp 50.000.000</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="text-2xl">✓</span>
                            <div>
                                <h4 className="font-semibold text-lg mb-1">Tanpa Agunan</h4>
                                <p className="text-gray-600">Tidak perlu jaminan apapun</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="text-2xl">✓</span>
                            <div>
                                <h4 className="font-semibold text-lg mb-1">Customer Service 24/7</h4>
                                <p className="text-gray-600">Siap membantu kapan saja</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Siap Mengajukan Pinjaman?
                    </h2>
                    <p className="text-blue-100 mb-6">
                        Daftar sekarang dan dapatkan persetujuan dalam waktu singkat!
                    </p>
                    <Link
                        href="/register"
                        className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition text-lg"
                    >
                        Mulai Sekarang →
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2025 Aplikasi Pinjaman. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
