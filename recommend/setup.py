from setuptools import setup, find_packages

import os, sys
try:
    from pip._internal.req import parse_requirements
except ImportError:
    from pip.req import parse_requirements


def parse_requiremnt():
    file_dir = os.path.abspath(os.path.dirname(__file__))
    requirement_filename = os.path.join(file_dir, "requirements.txt")
    install_reqs = parse_requirements(requirement_filename, session='hack')

    try:
        requirements = [str(ir.req) for ir in install_reqs]
    except:
        requirements = [str(ir.requirement) for ir in install_reqs]
    return requirements


sys.path.append(os.path.dirname(__file__) + "/recommend-client")

setup(name="recommend client",
      packages=find_packages(),
      version="1.0",
      install_requires=parse_requiremnt())
