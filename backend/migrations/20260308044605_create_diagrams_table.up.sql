CREATE TABLE diagrams (
	id UUID PRIMARY KEY,
	user_id UUID REFERENCES users(id),
	title TEXT,
	data JSONB,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW()
);