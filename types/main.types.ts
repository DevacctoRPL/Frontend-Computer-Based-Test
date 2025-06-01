export interface Test {
  tes_id: string;
  judul: string;
  deskripsi: string;
  durasi_menit: number;
  tanggal_mulai: string;
  tanggal_selesai: string;
  batas_percobaan: number;
  password_tes: string;
  mapel: string;
  jenis_ujian: string;
  semester: number;
  kelas: string[];
  jam_mulai: string;
}

export interface Soal {
  soal_id: string;
  tes_id: string;
  jenis_soal: string;
  pertanyaan: string;
  file_gambar: File | null;
  poin: number;
  list_jawaban: string[];
}

export interface loginResponse {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
    nama_lengkap: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  token: string;
}

export interface JawabanData {
  jawaban_id?: string;
  soal_id?: string;
  teks_pilihan: string;
  is_benar: boolean;
}

export type userData = {
  id: number;
  username: string;
  email: string;
  nama_lengkap: string;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export interface SoalResponse {
  data: Soal[];
}
