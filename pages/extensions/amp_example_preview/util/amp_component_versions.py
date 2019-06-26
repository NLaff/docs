import requests

COMPONENT_VERSIONS_URL = 'https://playground.amp.dev/api/amp-component-versions'

COMPONENT_VERSIONS = requests.get(COMPONENT_VERSIONS_URL).json()

class AmpComponent:

  def __init__(self, name, version):
    self.name = name
    self.version = version

  def __hash__(self):
    return hash(self.name) ^ hash(self.version)

  def __eq__(self, other):
    return self.name == other.name and self.version == other.version

  def __ne__(self, other):
    return not self.eq()

  def __str__(self):
    return "{}:{}".format(self.name, self.version)

def get_component(name):
  if name and name in COMPONENT_VERSIONS:
    return AmpComponent(name, COMPONENT_VERSIONS[name])
  return None

def get_components(names):
  result = []

  if names:
    if isinstance(names, basestring):
      collection = names.split(',')
    else:
      collection = names

    for name in collection:
      component = get_component(name.strip())
      if component:
        result.append(component)

  return result
