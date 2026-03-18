# ---------- Build Stage ----------
FROM golang:1.25.0 AS builder

WORKDIR /app

# Copy go mod files first (for caching dependencies)
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the binary
RUN CGO_ENABLED=0 GOOS=linux go build -o server ./cmd/server


# ---------- Run Stage ----------
FROM gcr.io/distroless/base-debian12

WORKDIR /app

# Copy compiled binary
COPY --from=builder /app/server .

EXPOSE 8080

CMD ["./server"]