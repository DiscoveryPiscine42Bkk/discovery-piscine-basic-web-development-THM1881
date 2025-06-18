cd ~/discovery_piscine/cell00/ex03
touch count_files.sh
nano count_files.sh
echo $(ls -1 | wc -l)
chmod +x count_files.sh
./count_files.sh
