cd ~/discovery_piscine/cell00/ex05
touch build.sh
nano build.sh
#!/bin/bash

# Loop through each argument
for arg in "$@"; do
    mkdir "ex$arg"
done
chmod +x build.sh
./build.sh 01 02 03
