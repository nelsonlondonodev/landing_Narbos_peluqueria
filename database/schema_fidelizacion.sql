-- Tabla principal para almacenar clientes del sistema de fidelización
CREATE TABLE IF NOT EXISTS public.clientes_fidelizacion (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    whatsapp TEXT NOT NULL,
    codigo_descuento TEXT NOT NULL UNIQUE,
    estado TEXT DEFAULT 'activo' CHECK (estado IN ('activo', 'canjeado', 'vencido')),
    fecha_canje TIMESTAMPTZ
);

-- Políticas de Seguridad (RLS)
ALTER TABLE public.clientes_fidelizacion ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública (para validación de cupones) pero escritura restringida
CREATE POLICY "Permitir lectura pública de cupones" 
ON public.clientes_fidelizacion FOR SELECT 
USING (true);

-- Permitir inserción solo a través de la API con Service Role (n8n usa Service Role)
-- Nota: Service Role ignora RLS por defecto, pero es buena práctica definir políticas.
