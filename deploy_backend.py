#!/usr/bin/python3
"""This module contains methods"""
from datetime import datetime
from fabric.api import put, run, local, env
from os.path import isdir, exists
from sys import argv

env.hosts = ["3.95.32.69", "54.144.129.181"]
env.user = "ubuntu"
env.key_filename = "~/.ssh/school"


def do_pack():
    """Method that creates a tgz archive"""
    try:
        date = datetime.now().strftime("%Y%m%d%H%M%S")
        if isdir("versions") is False:
            local("mkdir versions")
        file_name = "versions/web_dynamic_{}.tgz".format(date)
        local("tar -cvzf {} backend".format(file_name))
        return file_name
    except Exception:
        return None


def do_deploy(archive_path):
    """Moethod that distributes an archive to web servers"""
    if exists(archive_path) is False:
        return False
    try:
        file_name = archive_path.split("/")[-1]
        tar_name = file_name.split(".")[0]
        path = "/data/web_dynamic/releases/"
        put(archive_path, '/tmp/')
        run('mkdir -p {}{}/'.format(path, tar_name))
        run('tar -xzf /tmp/{} -C {}{}'.format(file_name, path, tar_name))
        run('rm /tmp/{}'.format(file_name))
        run('mv {0}{1}/backend/* {0}{1}'.format(path, tar_name))
        run('rm -rf {}{}/backend/'.format(path, tar_name))
        run('rm -rf /data/web_dynamic/current')
        run('ln -s {}{}/ /data/web_dynamic/current'.format(path, tar_name))
        print("New version deployed!")
        return True
    except Exception:
        return False


archive_path = do_pack()


def deploy():
    """Method that creates and distributes an archive to servers"""
    if archive_path is None:
        return False
    return do_deploy(archive_path)
