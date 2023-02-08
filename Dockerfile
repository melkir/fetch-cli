# Use the official Deno image as the base image
FROM denoland/deno:1.30.2

# Set the working directory in the container
WORKDIR /app

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory
# Copy the program to the container
COPY main.ts utils.ts .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

ENTRYPOINT ["deno", "run", "--allow-net", "--allow-write", "main.ts"]
