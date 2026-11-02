-- =============================================================================
-- Seed Data: Suzuki Diki Wahyudin Showroom Bandung
-- =============================================================================


INSERT INTO public.dealer_settings (
    id, dealer_name, sales_name, sales_title, phone, whatsapp, email, address, city, google_maps_url, operational_hours, flat_interest_rates, is_active
) VALUES (
    'd0000000-0000-0000-0000-000000000001',
    'Nusantara Jaya Sentosa (NJS) Ahmad Yani Bandung',
    'Diki Wahyudin',
    'Senior Suzuki Sales Consultant',
    '+6285189976233',
    '+6285189976233',
    'diki.wahyudin.suzuki@gmail.com',
    'Jl. Jendral Ahmad Yani No. 259, Cihapit, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40114',
    'Bandung',
    'https://maps.google.com/?q=Nusantara+Jaya+Sentosa+Ahmad+Yani+Bandung',
    '{"weekdays": "08:00 - 17:00", "saturday": "08:30 - 15:00", "sunday": "09:00 - 14:00"}'::jsonb,
    '{"1": 0.05, "2": 0.06, "3": 0.07, "4": 0.08, "5": 0.09}'::jsonb,
    TRUE
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.products (
    id, slug, name, tagline, category, price_start, dp_start, installment_start, featured, badge, description, main_image_url, features, specifications, sort_order
) VALUES (
    'a0000000-0000-0000-0000-000000000001', 'xl7', 'New Suzuki XL7', '7-Seater SUV Hybrid', 'passenger', 245350000, 36802500.0, 5039898, TRUE, 'BEST SELLER BANDUNG', 'SUV 7 penumpang dengan teknologi Smart Hybrid, ground clearance tinggi, dan desain maskulin. Cocok untuk keluarga aktif yang butuh kenyamanan dan efisiensi BBM.', 'newxl7.png', '[]'::jsonb, '{"Mesin": "K15B 1.5L Dualjet Hybrid", "Tenaga": "104 HP @ 6.000 rpm", "Torsi": "138 Nm @ 4.400 rpm", "Transmisi": "4AT / 5MT", "Bahan Bakar": "Bensin RON 90+", "Kapasitas Tangki": "45 Liter", "Dimensi (P x L x T)": "4.450 x 1.775 x 1.710 mm", "Wheelbase": "2.740 mm", "Ground Clearance": "200 mm", "Kapasitas Penumpang": "7 Orang", "Keselamatan": "Dual SRS Airbag, ABS, EBD, ESP", "Hiburan": "8\" Touchscreen, Bluetooth, USB"}'::jsonb, 1
) ON CONFLICT (slug) DO UPDATE SET
    price_start = EXCLUDED.price_start,
    dp_start = EXCLUDED.dp_start,
    installment_start = EXCLUDED.installment_start;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0010000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'XL7 New Zeta MT', 'Manual', 245350000, 36802500.0, 5039898, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0010000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'XL7 New Zeta AT', 'Automatic', 256450000, 38467500.0, 5267910, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0010000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'XL7 New Beta MT Hybrid', 'Manual', 273600000, 41040000.0, 5620200, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0010000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'XL7 New Beta AT Hybrid', 'Automatic', 284600000, 42690000.0, 5846158, 4
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0010000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000001', 'XL7 New Alpha MT Hybrid', 'Manual', 284100000, 42615000.0, 5835888, 5
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0010000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000001', 'XL7 New Alpha MT Hybrid 2 Tone', 'Manual', 286600000, 42990000.0, 5887242, 6
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0010000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000001', 'XL7 New Alpha AT Hybrid', 'Automatic', 295550000, 44332500.0, 6071090, 7
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0010000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000001', 'XL7 New Alpha AT Hybrid 2 Tone', 'Automatic', 297550000, 44632500.0, 6112173, 8
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0010000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000001', 'XL7 New Alpha AT Hybrid Kuro', 'Automatic', 302200000, 45330000.0, 6207692, 9
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0010000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000001', 'XL7 New Alpha AT Hybrid 2 Tone Kuro', 'Automatic', 303700000, 45555000.0, 6238504, 10
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0010000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000001', 'XL7 Zeta MT MC', 'Manual', 257700000, 38655000.0, 5293588, 11
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0010000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000001', 'XL7 Zeta AT MC', 'Automatic', 268700000, 40305000.0, 5519546, 12
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0010000-0000-0000-0000-000000000013', 'a0000000-0000-0000-0000-000000000001', 'XL7 Beta MT Hybrid MC', 'Manual', 285400000, 42810000.0, 5862592, 13
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0010000-0000-0000-0000-000000000014', 'a0000000-0000-0000-0000-000000000001', 'XL7 Beta AT Hybrid MC', 'Automatic', 296500000, 44475000.0, 6090604, 14
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0010000-0000-0000-0000-000000000015', 'a0000000-0000-0000-0000-000000000001', 'XL7 Alpha AT Hybrid MC', 'Automatic', 311300000, 46695000.0, 6394621, 15
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0010000-0000-0000-0000-000000000016', 'a0000000-0000-0000-0000-000000000001', 'XL7 Alpha AT Hybrid 2 Tone MC', 'Automatic', 313300000, 46995000.0, 6435704, 16
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0010000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Pearl White', '#F5F5F0', 'newxl7.png', FALSE, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0010000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Magma Red', '#8B1A1A', 'newxl7.png', FALSE, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0010000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Silky Silver', '#B8B8B8', 'newxl7.png', FALSE, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0010000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 'Prime Black', '#1A1A1A', 'newxl7.png', FALSE, 4
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.products (
    id, slug, name, tagline, category, price_start, dp_start, installment_start, featured, badge, description, main_image_url, features, specifications, sort_order
) VALUES (
    'a0000000-0000-0000-0000-000000000002', 'ertiga', 'Suzuki Ertiga', 'MPV Keluarga Hybrid', 'passenger', 237400000, 35610000.0, 4876592, TRUE, 'BEST SELLER BANDUNG', 'MPV keluarga terlaris dengan Smart Hybrid Technology. Irit BBM, kabin luas, dan berkarakter elegan untuk mobilitas keluarga sehari-hari.', 'SUZUKI_ERTIGA.png', '[]'::jsonb, '{"Mesin": "K15B 1.5L Dualjet Hybrid", "Tenaga": "104 HP @ 6.000 rpm", "Torsi": "138 Nm @ 4.400 rpm", "Transmisi": "4AT / 5MT", "Bahan Bakar": "Bensin RON 90+", "Kapasitas Tangki": "45 Liter", "Dimensi (P x L x T)": "4.395 x 1.735 x 1.690 mm", "Wheelbase": "2.740 mm", "Kapasitas Penumpang": "7 Orang", "Keselamatan": "Dual Airbag, ABS, EBD, ISOFIX", "Hiburan": "8\" Touchscreen, 4 Speaker"}'::jsonb, 2
) ON CONFLICT (slug) DO UPDATE SET
    price_start = EXCLUDED.price_start,
    dp_start = EXCLUDED.dp_start,
    installment_start = EXCLUDED.installment_start;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0020000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'All New Ertiga MC GL MT (2026)', 'Manual', 237400000, 35610000.0, 4876592, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0020000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'All New Ertiga MC GL AT (2026)', 'Automatic', 248100000, 37215000.0, 5096388, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0020000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', 'All New Ertiga MC GX MT (2026)', 'Manual', 259900000, 38985000.0, 5338779, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0020000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000002', 'All New Ertiga MC GX AT (2026)', 'Automatic', 270900000, 40635000.0, 5564738, 4
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0020000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000002', 'All New Ertiga Cruise MT (2026)', 'Manual', 272800000, 40920000.0, 5603767, 5
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0020000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000002', 'All New Ertiga Cruise MT 2 Tone (2026)', 'Manual', 274800000, 41220000.0, 5644850, 6
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0020000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000002', 'All New Ertiga Cruise AT (2026)', 'Automatic', 283900000, 42585000.0, 5831779, 7
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0020000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000002', 'All New Ertiga Cruise AT 2 Tone (2026)', 'Automatic', 285900000, 42885000.0, 5872862, 8
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0020000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'Pearl White', '#F5F5F0', 'SUZUKI_ERTIGA.png', FALSE, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0020000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'Magma Red', '#8B1A1A', 'SUZUKI_ERTIGA.png', FALSE, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0020000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000002', 'Silky Silver', '#B8B8B8', 'SUZUKI_ERTIGA.png', FALSE, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0020000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000002', 'Prime Black', '#1A1A1A', 'SUZUKI_ERTIGA.png', FALSE, 4
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0020000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000002', 'Metallic Blue', '#1E3A5F', 'SUZUKI_ERTIGA.png', FALSE, 5
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.products (
    id, slug, name, tagline, category, price_start, dp_start, installment_start, featured, badge, description, main_image_url, features, specifications, sort_order
) VALUES (
    'a0000000-0000-0000-0000-000000000003', 'carry', 'Suzuki Carry', 'Raja Niaga Indonesia', 'commercial', 154950000, 23242500.0, 3182931, TRUE, 'BEST SELLER BANDUNG', 'Pick up terlaris di Indonesia dengan daya angkut maksimal, mesin bandel, dan biaya operasional rendah. Pilihan tepat untuk usaha Anda.', 'carry-pu.png', '[]'::jsonb, '{"Mesin": "K15B 1.5L", "Tenaga": "96 HP @ 6.000 rpm", "Torsi": "135 Nm @ 4.400 rpm", "Transmisi": "5MT", "Bahan Bakar": "Bensin RON 90+", "Kapasitas Tangki": "42 Liter", "Dimensi (P x L x T)": "4.195 x 1.765 x 1.910 mm", "Wheelbase": "2.530 mm", "Daya Angkut": "\u00b1 1.000 kg", "Fitur": "Power Steering, AC (tipe tertentu)"}'::jsonb, 3
) ON CONFLICT (slug) DO UPDATE SET
    price_start = EXCLUDED.price_start,
    dp_start = EXCLUDED.dp_start,
    installment_start = EXCLUDED.installment_start;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0030000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 'New Carry PU FD', 'Manual', 154950000, 23242500.0, 3182931, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0030000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000003', 'New Carry PU FD AC PS', 'Manual', 161850000, 24277500.0, 3324669, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0030000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 'New Carry PU WD', 'Manual', 155950000, 23392500.0, 3203473, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0030000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000003', 'New Carry PU WD AC PS', 'Manual', 162750000, 24412500.0, 3343156, 4
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0030000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 'Super White', '#F5F5F0', 'carry-pu.png', FALSE, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0030000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000003', 'Silky Silver', '#B8B8B8', 'carry-pu.png', FALSE, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0030000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 'Black', '#1A1A1A', 'carry-pu.png', FALSE, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.products (
    id, slug, name, tagline, category, price_start, dp_start, installment_start, featured, badge, description, main_image_url, features, specifications, sort_order
) VALUES (
    'a0000000-0000-0000-0000-000000000004', 'carry-box', 'Suzuki Carry Box', 'Solusi Angkutan Bisnis Modern', 'commercial', 227300000, 34095000.0, 4669121, FALSE, 'BEST SELLER BANDUNG', 'Kendaraan niaga box andal dengan kapasitas besar, cocok untuk logistik, distribusi, kuliner, dan operasional bisnis harian. Irit, tangguh, dan siap mendukung usaha Anda.', 'carry-box.png', '[]'::jsonb, '{"Mesin": "K15B 1.5L", "Tenaga": "96 HP @ 6.000 rpm", "Torsi": "135 Nm @ 4.400 rpm", "Transmisi": "5MT", "Bahan Bakar": "Bensin RON 90+", "Kapasitas Tangki": "42 Liter", "Dimensi (P x L x T)": "4.350 x 1.765 x 2.200 mm", "Wheelbase": "2.530 mm", "Kapasitas Box": "\u00b1 6 Kubik", "Daya Angkut": "\u00b1 1 Ton", "Fitur": "Power Steering, AC, Central Lock"}'::jsonb, 4
) ON CONFLICT (slug) DO UPDATE SET
    price_start = EXCLUDED.price_start,
    dp_start = EXCLUDED.dp_start,
    installment_start = EXCLUDED.installment_start;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0040000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000004', 'Carry Box Standard', 'Manual', 227300000, 34095000.0, 4669121, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0040000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000004', 'Carry Box AC PS', 'Manual', 227300000, 34095000.0, 4669121, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0040000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000004', 'Carry Refrigerated Box', 'Automatic', 227300000, 34095000.0, 4669121, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0040000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000004', 'Carry Box Custom Fleet', 'Manual', 227300000, 34095000.0, 4669121, 4
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0040000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000004', 'Superior White', '#F5F5F5', 'carry-box.png', FALSE, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0040000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000004', 'Silky Silver', '#B8B8B8', 'carry-box.png', FALSE, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0040000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000004', 'Jet Black', '#1A1A1A', 'carry-box.png', FALSE, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.products (
    id, slug, name, tagline, category, price_start, dp_start, installment_start, featured, badge, description, main_image_url, features, specifications, sort_order
) VALUES (
    'a0000000-0000-0000-0000-000000000005', 'jimny-3door', 'Suzuki Jimny 3 Door', 'Legendary 4x4 Compact', 'passenger', 451550000, 67732500.0, 9275590, FALSE, 'BEST SELLER BANDUNG', 'Ikon off-road legendaris dengan desain retro-modern. Jimny 3 Door yang compact dan agile, siap taklukkan segala medan.', 'jimny1.png', '[]'::jsonb, '{"Mesin": "K15B 1.5L", "Tenaga": "102 HP @ 6.000 rpm", "Torsi": "130 Nm @ 4.000 rpm", "Transmisi": "4AT / 5MT", "Penggerak": "Part-time 4WD", "Bahan Bakar": "Bensin RON 90+", "Dimensi (P x L x T)": "3.645 x 1.645 x 1.720 mm", "Wheelbase": "2.250 mm", "Ground Clearance": "210 mm", "Kapasitas Penumpang": "4 Orang", "Off-Road": "4H, 4L, Diff Lock"}'::jsonb, 5
) ON CONFLICT (slug) DO UPDATE SET
    price_start = EXCLUDED.price_start,
    dp_start = EXCLUDED.dp_start,
    installment_start = EXCLUDED.installment_start;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0050000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000005', 'Jimny 3 Door MT', 'Manual', 471550000, 70732500.0, 9686423, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0050000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000005', 'Jimny 3 Door AT', 'Automatic', 484000000, 72600000.0, 9942167, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0050000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000005', 'Jimny 3 Door MT 2 Tone', 'Manual', 474850000, 71227500.0, 9754210, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0050000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000005', 'Jimny 3 Door AT 2 Tone', 'Automatic', 487300000, 73095000.0, 10009954, 4
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0050000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000005', 'Jimny 3 Door MT (Khusus Fleet)', 'Manual', 451550000, 67732500.0, 9275590, 5
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0050000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000005', 'Jimny 3 Door AT (Khusus Fleet)', 'Automatic', 464000000, 69600000.0, 9531333, 6
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0050000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000005', 'Jimny 3 Door MT 2 Tone (Khusus Fleet)', 'Manual', 454850000, 68227500.0, 9343377, 7
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0050000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000005', 'Jimny 3 Door AT 2 Tone (Khusus Fleet)', 'Automatic', 467300000, 70095000.0, 9599121, 8
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0050000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000005', 'Kinetic Yellow', '#E8D44D', 'jimny1.png', FALSE, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0050000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000005', 'Jungle Green', '#2E5A2E', 'jimny1.png', FALSE, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0050000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000005', 'Pearl White', '#F5F5F0', 'jimny1.png', FALSE, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0050000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000005', 'Brisk Blue', '#2255AA', 'jimny1.png', FALSE, 4
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0050000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000005', 'Sizzling Red', '#C41E3A', 'jimny1.png', FALSE, 5
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0050000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000005', 'Black', '#1A1A1A', 'jimny1.png', FALSE, 6
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.products (
    id, slug, name, tagline, category, price_start, dp_start, installment_start, featured, badge, description, main_image_url, features, specifications, sort_order
) VALUES (
    'a0000000-0000-0000-0000-000000000006', 'jimny-5door', 'Suzuki Jimny 5 Door', 'Legendary 4x4 Family', 'passenger', 451100000, 67665000.0, 9266346, FALSE, 'BEST SELLER BANDUNG', 'Jimny legendaris kini hadir dengan 5 pintu untuk kenyamanan keluarga. Tetap tangguh di segala medan dengan kapasitas penumpang lebih banyak.', 'jimny5.png', '[]'::jsonb, '{"Mesin": "K15B 1.5L", "Tenaga": "102 HP @ 6.000 rpm", "Torsi": "130 Nm @ 4.000 rpm", "Transmisi": "4AT / 5MT", "Penggerak": "Part-time 4WD", "Bahan Bakar": "Bensin RON 90+", "Dimensi (P x L x T)": "3.985 x 1.645 x 1.720 mm", "Wheelbase": "2.590 mm", "Ground Clearance": "210 mm", "Kapasitas Penumpang": "5 Orang", "Off-Road": "4H, 4L, Diff Lock"}'::jsonb, 6
) ON CONFLICT (slug) DO UPDATE SET
    price_start = EXCLUDED.price_start,
    dp_start = EXCLUDED.dp_start,
    installment_start = EXCLUDED.installment_start;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0060000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000006', 'Jimny 5 Door MT', 'Manual', 471100000, 70665000.0, 9677179, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0060000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000006', 'Jimny 5 Door AT', 'Automatic', 484200000, 72630000.0, 9946275, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0060000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000006', 'Jimny 5 Door MT 2 Tone', 'Manual', 474350000, 71152500.0, 9743940, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0060000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000006', 'Jimny 5 Door AT 2 Tone', 'Automatic', 487400000, 73110000.0, 10012008, 4
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0060000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000006', 'Jimny 5 Door MT (Khusus Fleet)', 'Manual', 451100000, 67665000.0, 9266346, 5
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0060000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000006', 'Jimny 5 Door AT (Khusus Fleet)', 'Automatic', 464200000, 69630000.0, 9535442, 6
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0060000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000006', 'Jimny 5 Door MT 2 Tone (Khusus Fleet)', 'Manual', 454350000, 68152500.0, 9333106, 7
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0060000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000006', 'Jimny 5 Door AT 2 Tone (Khusus Fleet)', 'Automatic', 467400000, 70110000.0, 9601175, 8
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0060000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000006', 'Kinetic Yellow', '#E8D44D', 'jimny5.png', FALSE, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0060000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000006', 'Jungle Green', '#2E5A2E', 'jimny5.png', FALSE, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0060000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000006', 'Pearl White', '#F5F5F0', 'jimny5.png', FALSE, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0060000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000006', 'Brisk Blue', '#2255AA', 'jimny5.png', FALSE, 4
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0060000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000006', 'Sizzling Red', '#C41E3A', 'jimny5.png', FALSE, 5
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0060000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000006', 'Black', '#1A1A1A', 'jimny5.png', FALSE, 6
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.products (
    id, slug, name, tagline, category, price_start, dp_start, installment_start, featured, badge, description, main_image_url, features, specifications, sort_order
) VALUES (
    'a0000000-0000-0000-0000-000000000007', 'grand-vitara', 'Suzuki Grand Vitara', 'SUV Hybrid Premium', 'passenger', 367400000, 55110000.0, 7547008, TRUE, 'BEST SELLER BANDUNG', 'SUV premium dengan teknologi ALLGRIP intelligent AWD dan Smart Hybrid. Desain mewah, berkendara nyaman di segala medan.', 'grand-vitara.png', '[]'::jsonb, '{"Mesin": "K15B 1.5L Dualjet Hybrid", "Tenaga": "103 HP @ 6.000 rpm", "Torsi": "134 Nm @ 4.400 rpm", "Transmisi": "6AT", "Penggerak": "ALLGRIP (Alpha) / FWD", "Bahan Bakar": "Bensin RON 90+", "Dimensi (P x L x T)": "4.345 x 1.785 x 1.645 mm", "Wheelbase": "2.600 mm", "Ground Clearance": "210 mm", "Kapasitas Penumpang": "5 Orang", "Keselamatan": "6 Airbag, ABS, EBD, ESP, Hill Descent"}'::jsonb, 7
) ON CONFLICT (slug) DO UPDATE SET
    price_start = EXCLUDED.price_start,
    dp_start = EXCLUDED.dp_start,
    installment_start = EXCLUDED.installment_start;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0070000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000007', 'Grand Vitara GX MC AT', 'Automatic', 428300000, 64245000.0, 8797996, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0070000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000007', 'Grand Vitara GX MC AT 2 Tone (Silver)', 'Automatic', 372400000, 55860000.0, 7649717, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0070000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000007', 'Grand Vitara GX MC AT 2 Tone (White)', 'Automatic', 367400000, 55110000.0, 7547008, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0070000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000007', 'Pearl White', '#F5F5F0', 'grand-vitara.png', FALSE, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0070000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000007', 'Sapphire Blue', '#1E3A5F', 'grand-vitara.png', FALSE, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0070000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000007', 'Magma Red', '#8B1A1A', 'grand-vitara.png', FALSE, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0070000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000007', 'Premium Silver', '#B8B8B8', 'grand-vitara.png', FALSE, 4
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0070000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000007', 'Black', '#1A1A1A', 'grand-vitara.png', FALSE, 5
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.products (
    id, slug, name, tagline, category, price_start, dp_start, installment_start, featured, badge, description, main_image_url, features, specifications, sort_order
) VALUES (
    'a0000000-0000-0000-0000-000000000008', 'spresso', 'Suzuki S-Presso', 'City Car Irit & Praktis', 'passenger', 173650000, 26047500.0, 3567060, FALSE, 'BEST SELLER BANDUNG', 'City car compact dengan ground clearance tinggi, irit BBM, dan harga terjangkau. Pilihan tepat untuk mobilitas harian di kota.', 'spresso.png', '[]'::jsonb, '{"Mesin": "K10B 1.0L", "Tenaga": "66 HP @ 5.500 rpm", "Torsi": "90 Nm @ 3.500 rpm", "Transmisi": "AT / 5MT", "Bahan Bakar": "Bensin RON 90+", "Kapasitas Tangki": "27 Liter", "Dimensi (P x L x T)": "3.565 x 1.520 x 1.565 mm", "Wheelbase": "2.380 mm", "Ground Clearance": "180 mm", "Kapasitas Penumpang": "5 Orang", "Fitur": "Touchscreen, LED DRL"}'::jsonb, 8
) ON CONFLICT (slug) DO UPDATE SET
    price_start = EXCLUDED.price_start,
    dp_start = EXCLUDED.dp_start,
    installment_start = EXCLUDED.installment_start;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0080000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000008', 'S-Presso MT (2025)', 'Manual', 173650000, 26047500.0, 3567060, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0080000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000008', 'S-Presso AT (2025)', 'Automatic', 185050000, 27757500.0, 3801235, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0080000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000008', 'S-Presso MT (2026)', 'Manual', 173650000, 26047500.0, 3567060, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0080000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000008', 'S-Presso AT (2026)', 'Automatic', 185050000, 27757500.0, 3801235, 4
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0080000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000008', 'Sapphire Blue', '#1E3A5F', 'spresso.png', FALSE, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0080000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000008', 'Silky Silver', '#B8B8B8', 'spresso.png', FALSE, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0080000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000008', 'Pearl White', '#F5F5F0', 'spresso.png', FALSE, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0080000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000008', 'Fire Red', '#C41E3A', 'spresso.png', FALSE, 4
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0080000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000008', 'Black', '#1A1A1A', 'spresso.png', FALSE, 5
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.products (
    id, slug, name, tagline, category, price_start, dp_start, installment_start, featured, badge, description, main_image_url, features, specifications, sort_order
) VALUES (
    'a0000000-0000-0000-0000-000000000009', 'fronx', 'Suzuki Fronx', 'Crossover Compact Stylish', 'passenger', 240800000, 36120000.0, 4946433, TRUE, 'BEST SELLER BANDUNG', 'Crossover compact dengan desain futuristik, fitur canggih, dan berkendara menyenangkan. Cocok untuk generasi muda yang berani tampil beda.', 'fronx.png', '[]'::jsonb, '{"Mesin": "K15B 1.5L Turbo", "Tenaga": "140 HP @ 5.500 rpm", "Torsi": "200 Nm @ 1.500-3.000 rpm", "Transmisi": "6AT / 5MT", "Bahan Bakar": "Bensin RON 90+", "Kapasitas Tangki": "44 Liter", "Dimensi (P x L x T)": "4.315 x 1.765 x 1.640 mm", "Wheelbase": "2.600 mm", "Ground Clearance": "195 mm", "Kapasitas Penumpang": "5 Orang", "Keselamatan": "6 Airbag, ABS, EBD, ESP", "Hiburan": "9\" Touchscreen, Wireless Charging"}'::jsonb, 9
) ON CONFLICT (slug) DO UPDATE SET
    price_start = EXCLUDED.price_start,
    dp_start = EXCLUDED.dp_start,
    installment_start = EXCLUDED.installment_start;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0090000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000009', 'Fronx GL MT', 'Manual', 240800000, 36120000.0, 4946433, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0090000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000009', 'Fronx GX MT', 'Manual', 275650000, 41347500.0, 5662310, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0090000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000009', 'Fronx GX AT', 'Automatic', 295280000, 44292000.0, 6065543, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0090000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000009', 'Fronx SGX AT 1 Tone', 'Automatic', 314500000, 47175000.0, 6460354, 4
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0090000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000009', 'Fronx SGX AT 2 Tone', 'Automatic', 319500000, 47925000.0, 6563062, 5
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0090000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000009', 'Fronx GL MT (2026)', 'Manual', 256300000, 38445000.0, 5264829, 6
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0090000-0000-0000-0000-000000000007', 'a0000000-0000-0000-0000-000000000009', 'Fronx GL AT (2026)', 'Automatic', 265900000, 39885000.0, 5462029, 7
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0090000-0000-0000-0000-000000000008', 'a0000000-0000-0000-0000-000000000009', 'Fronx GX MT (2026)', 'Manual', 283650000, 42547500.0, 5826644, 8
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0090000-0000-0000-0000-000000000009', 'a0000000-0000-0000-0000-000000000009', 'Fronx GX AT (2026)', 'Automatic', 301750000, 45262500.0, 6198448, 9
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0090000-0000-0000-0000-000000000010', 'a0000000-0000-0000-0000-000000000009', 'Fronx SGX AT 1 Tone (2026)', 'Automatic', 330950000, 49642500.0, 6798265, 10
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0090000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000009', 'Fronx SGX AT 2 Tone (2026)', 'Automatic', 332950000, 49942500.0, 6839348, 11
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0090000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000009', 'Fronx SGX AT Kuro (2026)', 'Automatic', 331900000, 49785000.0, 6817779, 12
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0090000-0000-0000-0000-000000000013', 'a0000000-0000-0000-0000-000000000009', 'Fronx GL AT', 'Automatic', 275300000, 41295000.0, 5655121, 13
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0090000-0000-0000-0000-000000000014', 'a0000000-0000-0000-0000-000000000009', 'Fronx SGX AT (Ivory & Putih)', 'Automatic', 331000000, 49650000.0, 6799292, 14
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0090000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000009', 'Pearl White', '#F5F5F0', 'fronx.png', FALSE, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0090000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000009', 'Sapphire Blue', '#1E3A5F', 'fronx.png', FALSE, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0090000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000009', 'Magma Red', '#8B1A1A', 'fronx.png', FALSE, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0090000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000009', 'Silky Silver', '#B8B8B8', 'fronx.png', FALSE, 4
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0090000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000009', 'Black', '#1A1A1A', 'fronx.png', FALSE, 5
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.products (
    id, slug, name, tagline, category, price_start, dp_start, installment_start, featured, badge, description, main_image_url, features, specifications, sort_order
) VALUES (
    'a0000000-0000-0000-0000-000000000010', 'apv', 'Suzuki APV', 'MPV Keluarga Tangguh', 'passenger', 218100000, 32715000.0, 4480138, FALSE, 'BEST SELLER BANDUNG', 'MPV legendaris yang tangguh untuk segala kebutuhan keluarga. Kabin luas, mesin bandel, dan harga terjangkau untuk mobilitas harian.', 'apv.png', '[]'::jsonb, '{"Mesin": "G15A 1.5L", "Tenaga": "104 HP @ 6.000 rpm", "Torsi": "134 Nm @ 3.000 rpm", "Transmisi": "5MT", "Bahan Bakar": "Bensin RON 90+", "Kapasitas Tangki": "43 Liter", "Dimensi (P x L x T)": "4.150 x 1.655 x 1.855 mm", "Wheelbase": "2.625 mm", "Kapasitas Penumpang": "8 Orang", "Fitur": "AC Double Blower, Power Window"}'::jsonb, 10
) ON CONFLICT (slug) DO UPDATE SET
    price_start = EXCLUDED.price_start,
    dp_start = EXCLUDED.dp_start,
    installment_start = EXCLUDED.installment_start;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0100000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000010', 'APV GE PS MT AB', 'Manual', 218100000, 32715000.0, 4480138, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0100000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000010', 'APV GL MT AB', 'Manual', 231300000, 34695000.0, 4751288, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0100000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000010', 'APV GX MT AB', 'Manual', 245300000, 36795000.0, 5038871, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0100000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000010', 'APV SGX MT AB', 'Manual', 249250000, 37387500.0, 5120010, 4
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0100000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000010', 'Silky Silver', '#B8B8B8', 'apv.png', FALSE, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0100000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000010', 'Super White', '#F5F5F0', 'apv.png', FALSE, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0100000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000010', 'Black', '#1A1A1A', 'apv.png', FALSE, 3
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0100000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000010', 'Blue', '#1E3A5F', 'apv.png', FALSE, 4
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.products (
    id, slug, name, tagline, category, price_start, dp_start, installment_start, featured, badge, description, main_image_url, features, specifications, sort_order
) VALUES (
    'a0000000-0000-0000-0000-000000000011', 'apv-blind-van', 'Suzuki APV Blind Van', 'Van Niaga Andalan', 'commercial', 176800000, 26520000.0, 3631767, FALSE, 'BEST SELLER BANDUNG', 'APV Blind Van adalah solusi niaga terpercaya untuk pengiriman barang. Kabin tertutup tanpa jendela, muat banyak barang dengan biaya operasional rendah.', 'blindvan.jpg', '[]'::jsonb, '{"Mesin": "G15A 1.5L", "Tenaga": "104 HP @ 6.000 rpm", "Torsi": "134 Nm @ 3.000 rpm", "Transmisi": "5MT", "Bahan Bakar": "Bensin RON 90+", "Kapasitas Tangki": "43 Liter", "Dimensi (P x L x T)": "4.150 x 1.655 x 1.855 mm", "Wheelbase": "2.625 mm", "Tipe": "Blind Van (Tanpa Jendela Samping)", "Fitur": "Kabin Tertutup, Rak Muatan"}'::jsonb, 11
) ON CONFLICT (slug) DO UPDATE SET
    price_start = EXCLUDED.price_start,
    dp_start = EXCLUDED.dp_start,
    installment_start = EXCLUDED.installment_start;


INSERT INTO public.product_variants (
    id, product_id, name, transmission, otr_price, dp_min, installment_min, sort_order
) VALUES (
    'b0110000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000011', 'APV Blind Van', 'Manual', 176800000, 26520000.0, 3631767, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0110000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000011', 'Super White', '#F5F5F0', 'blindvan.jpg', FALSE, 1
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.vehicle_colors (
    id, product_id, name, hex_code, image_url, is_two_tone, sort_order
) VALUES (
    'c0110000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000011', 'Silky Silver', '#B8B8B8', 'blindvan.jpg', FALSE, 2
) ON CONFLICT (id) DO NOTHING;


INSERT INTO public.promotions (
    id, title, slug, badge, description, highlight, dp_promo, installment_promo, bonus_items, is_active
) VALUES (
    'e0000000-0000-0000-0000-000000000001',
    'Promo Super DP Ringan Suzuki XL7 Hybrid Bandung',
    'promo-xl7-hybrid-bandung',
    'HOT PROMO 2026',
    'Dapatkan subsidi cashback puluhan juta rupiah, bunga 0%, dan bonus paket aksesoris eksklusif khusus pemesanan bulan ini bersama Diki Wahyudin.',
    'DP Mulai 18 Jutaan / Angsuran Ringan',
    18000000,
    4500000,
    '["Kaca Film Solargard Bergaransi 5 Tahun", "Karpet Set Orisinil Suzuki", "Talang Air & Dudukan Plat", "Free Jasa Servis & Oli s.d 50.000 KM", "Garansi Aki & Baterai Lithium Hybrid 8 Tahun"]'::jsonb,
    TRUE
),
(
    'e0000000-0000-0000-0000-000000000002',
    'Promo New Carry Pick Up - Rajanya Usaha Bandung',
    'promo-carry-pickup-bandung',
    'PROMO NIAGA',
    'Solusi terbaik kendaraan niaga tangguh dan irit. DP termurah se-Jawa Barat, proses kredit dibantu sampai approve 100%!',
    'DP Mulai 8 Jutaan / Cicilan 3 Jutaan',
    8000000,
    3600000,
    '["Kaca Film", "Apar Pemadam", "Free Jasa Servis s.d 50.000 KM", "Free Oli Mesin"]'::jsonb,
    TRUE
),
(
    'e0000000-0000-0000-0000-000000000003',
    'Special Deal Suzuki All New Ertiga Cruise Hybrid',
    'promo-ertiga-cruise-bandung',
    'PROMO KELUARGA',
    'MPV ternyaman dan teririt di kelasnya dengan Cruise Control dan Smart Hybrid Vehicle by Suzuki (SHVS).',
    'DP Mulai 15 Jutaan',
    15000000,
    4200000,
    '["Kaca Film Full", "Voucher Belanja", "Karpet Beludru Orisinil", "Layanan Emergency Call 24 Jam"]'::jsonb,
    TRUE
) ON CONFLICT (slug) DO NOTHING;


INSERT INTO public.testimonials (
    id, customer_name, city, vehicle_model, rating, comment, handover_date, is_featured
) VALUES (
    'f0000000-0000-0000-0000-000000000001',
    'Bpk. Hendra Gunawan',
    'Bandung Wetan',
    'Suzuki XL7 Alpha Hybrid Two Tone',
    5,
    'Pelayanan Kang Diki Wahyudin sangat memuaskan, ramah, dan profesional. Proses pengajuan leasing BCA Finance dibantu dari awal sampai mobil dikirim ke rumah tanpa ribet!',
    '2026-09-15',
    TRUE
),
(
    'f0000000-0000-0000-0000-000000000002',
    'Ibu Ratna Dewi',
    'Buahbatu, Bandung',
    'Suzuki All New Ertiga Cruise AT',
    5,
    'Awalnya ragu simulasi kredit, tapi Kang Diki hitungkan dengan transparan dan carikan DP paling pas di kantong. Bonus aksesorisnya melimpah. Hatur nuhun Kang Diki!',
    '2026-10-02',
    TRUE
),
(
    'f0000000-0000-0000-0000-000000000003',
    'H. Asep Suryana',
    'Cimahi',
    'Suzuki New Carry Pick Up FD',
    5,
    'Untuk usaha angkutan material, Carry memang juaranya. Beli lewat Kang Diki diskonnya paling mantap se-Bandung Raya, STNK dan plat cepat jadi.',
    '2026-10-20',
    TRUE
) ON CONFLICT (id) DO NOTHING;
