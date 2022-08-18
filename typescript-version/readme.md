pscale connect edupy main --port 3310
npx prisma generate --schema ./src/prisma/schema.prisma
npx prisma db push --schema ./src/prisma/schema.prisma
pscale connect edupy shadow --port 3309
pscale shell edupy shadow
